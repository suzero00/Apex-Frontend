import type {AxiosRequestConfig} from 'axios'
import axios from 'axios'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
	_retry?: boolean
}

// Теперь очередь хранит новый токен в resolve, чтобы запросы гарантированно обновляли заголовки
interface FailedRequest {
	resolve: (token: string) => void
	reject: (reason: any) => void
	originalRequestConfig: CustomAxiosRequestConfig
}

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
})

let isRefreshing = false
let failedQueue: FailedRequest[] = []
const REFRESH_URL = '/auth/refresh'

// Раздаем новый токен всем ожидавщим запросам
const processQueue = (error: any | null, token: string | null = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error)
		} else {
			prom.resolve(token!)
		}
	})
	failedQueue = []
}

// 1. Интерцептор запросов
api.interceptors.request.use(
	config => {
		const token = localStorage.getItem('accessToken')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error),
)

// 2. Интерцептор ответов
api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config as CustomAxiosRequestConfig

		// Проверяем на 401 и убеждаемся, что это не сам запрос рефреша (используем includes для надежности путей)
		if (error.response?.status === 401 && !originalRequest.url?.includes(REFRESH_URL)) {
			// Если рефреш уже идет — кладем запрос в очередь
			if (isRefreshing) {
				return new Promise<string>((resolve, reject) => {
					failedQueue.push({
						resolve,
						reject,
						originalRequestConfig: originalRequest,
					})
				})
					.then(token => {
						// Перед повторным вызовом принудительно заменяем заголовок на свежий
						if (originalRequest.headers) {
							originalRequest.headers.Authorization = `Bearer ${token}`
						}
						return api(originalRequest)
					})
					.catch(err => Promise.reject(err))
			}

			if (!originalRequest._retry) {
				originalRequest._retry = true
				isRefreshing = true

				try {
					console.log('Attempting to refresh token...')

					// ВАЖНО: Делаем запрос через дефолтный axios, а не через api!
					// И передаем baseUrl вручную, чтобы не слать протухший accessToken в заголовках.
					const response = await axios.post<{accessToken: string}>(`${import.meta.env.VITE_API_URL}${REFRESH_URL}`, {}, {withCredentials: true})

					const newAccessToken = response.data.accessToken
					console.log('Token refreshed successfully.')

					// Сохраняем новый токен в хранилище
					localStorage.setItem('accessToken', newAccessToken)

					// Обновляем заголовок для текущего упавшего запроса
					if (originalRequest.headers) {
						originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
					}

					// Пропускаем очередь, передавая им свежий токен
					processQueue(null, newAccessToken)

					// Повторяем изначальный запрос
					return api(originalRequest)
				} catch (refreshError: any) {
					console.error('Failed to refresh token:', refreshError)
					processQueue(refreshError, null)

					// Стираем нерабочий токен и уводим на страницу входа
					localStorage.removeItem('accessToken')
					if (window.location.pathname !== '/auth/sign-in') {
						window.location.href = '/auth/sign-in'
					}

					return Promise.reject(refreshError)
				} finally {
					isRefreshing = false
				}
			}
		}

		return Promise.reject(error)
	},
)
