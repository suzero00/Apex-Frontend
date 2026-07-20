import type {AxiosRequestConfig} from 'axios'
import axios from 'axios'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
	_retry?: boolean
}

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
const LOGIN_URL = '/auth/sign-in'
const SIGNUP_URL = '/auth/sign-up'

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

api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config as CustomAxiosRequestConfig

		const isAuthRoute =
			originalRequest.url?.includes(REFRESH_URL) ||
			originalRequest.url?.includes(LOGIN_URL) ||
			originalRequest.url?.includes(SIGNUP_URL)

		if (error.response?.status === 401 && !isAuthRoute) {
			if (isRefreshing) {
				return new Promise<string>((resolve, reject) => {
					failedQueue.push({
						resolve,
						reject,
						originalRequestConfig: originalRequest,
					})
				})
					.then(token => {
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

					const response = await axios.post<{accessToken: string}>(
						`${import.meta.env.VITE_API_URL}${REFRESH_URL}`,
						{},
						{withCredentials: true},
					)

					const newAccessToken = response.data.accessToken
					console.log('Token refreshed successfully.')

					localStorage.setItem('accessToken', newAccessToken)

					if (originalRequest.headers) {
						originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
					}

					processQueue(null, newAccessToken)

					return api(originalRequest)
				} catch (refreshError: any) {
					console.error('Failed to refresh token:', refreshError)
					processQueue(refreshError, null)

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
