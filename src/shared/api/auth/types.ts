import {User} from '@/shared/model/User'

export interface AuthResponse {
	accessToken: string
	user: User
}
