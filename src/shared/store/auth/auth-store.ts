import {makeAutoObservable, runInAction} from 'mobx'
import {SignUpBody} from '@/pages/auth/sign-up/lib/sign-up-schema'
import {SignInBody} from '@/pages/auth/sign-in/lib/sign-in-schema'
import {logout, signIn, signUp} from '@/shared/api'
import {User} from '@/shared/model/User'

class AuthStore {
	user: User | null = null
	isLoading = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	clearError() {
		this.error = null
	}

	async signUpAction(body: SignUpBody) {
		this.isLoading = true
		this.error = null
		try {
			const data = await signUp(body)

			runInAction(() => {
				this.user = data.user
				if (data.accessToken) {
					localStorage.setItem('accessToken', data.accessToken)
				}
				this.isLoading = false
			})
			return data
		} catch (err: any) {
			runInAction(() => {
				this.isLoading = false
				this.error =
					err.response?.data?.message ||
					'Что-то пошло не так при регистрации'
			})
			throw err
		}
	}

	async signInAction(body: SignInBody) {
		this.isLoading = true
		this.error = null
		try {
			const data = await signIn(body)
			runInAction(() => {
				this.user = data.user
				if (data.accessToken) {
					localStorage.setItem('accessToken', data.accessToken)
				}
				this.isLoading = false
			})

			return data
		} catch (err: any) {
			runInAction(() => {
				this.isLoading = false
				this.error =
					err.response?.data?.message || 'Неверный логин или пароль'
			})
			throw err
		}
	}

	async logoutAction() {
		try {
			await logout()
			runInAction(() => {
				this.user = null
				localStorage.removeItem('accessToken')
			})
		} catch (err) {
			console.error('Ошибка при выходе:', err)
			runInAction(() => {
				this.user = null
				localStorage.removeItem('accessToken')
			})
		}
	}
}

export const authStore = new AuthStore()
