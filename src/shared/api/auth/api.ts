import {api} from '../axiosInstance'
import {AuthResponse} from './types'
import {SignUpBody} from '@/pages/auth/sign-up/lib/sign-up-schema'
import {SignInBody} from '@/pages/auth/sign-in/lib/sign-in-schema'

export const signUp = async (body: SignUpBody) => {
	const res = await api.post<AuthResponse>('/auth/register', body)
	console.log(res.data, 'signUp')
	return res.data
}

export const signIn = async (body: SignInBody) => {
	const res = await api.post<AuthResponse>('/auth/login', body)
	console.log(res.data, 'signIn')
	return res.data
}

export const refresh = async () => {
	const res = await api.post<AuthResponse>('/auth/refresh')
	console.log(res.data, 'refresh')
	return res.data
}

export const logout = async () => {
	const {data} = await api.post('/auth/logout')
	return data
}
