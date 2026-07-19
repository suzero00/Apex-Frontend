import {getAllUsers} from '@/shared/api'
import {User} from '@/shared/model/User'
import {makeAutoObservable, runInAction} from 'mobx'

class UsersStore {
	users: User[] = []

	constructor() {
		makeAutoObservable(this)
	}

	async getAllUsersAction() {
		try {
			const data = await getAllUsers()
			runInAction(() => {
				this.user = data
			})
			return data
		} catch (error) {}
	}
}

export const usersStore = new UsersStore()
