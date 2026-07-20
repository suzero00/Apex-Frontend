import {getAllUsers} from '@/shared/api'
import {User} from '@/shared/model/User'
import {makeAutoObservable, runInAction} from 'mobx'

class UsersStore {
	users: User[] = []
	isLoading = false

	constructor() {
		makeAutoObservable(this)
	}

	async getAllUsersAction() {
		this.isLoading = true
		try {
			const data = await getAllUsers()
			runInAction(() => {
				this.users = data
				this.isLoading = false
			})
			return data
		} catch (error: any) {
			runInAction(() => {
				this.isLoading = false
			})

			if (error.response?.status === 403) {
				alert(
					'Доступ запрещен: Для выполнения этого действия требуются права администратора.',
				)
				console.log(
					'Доступ запрещен: Для выполнения этого действия требуются права администратора.',
				)
			} else {
				alert(
					error.response?.data?.message ||
						'Произошла ошибка при загрузке пользователей.',
				)
			}

			throw error
		}
	}
}

export const usersStore = new UsersStore()
