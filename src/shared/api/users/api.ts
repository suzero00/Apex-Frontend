import {api} from '../axiosInstance'

export const getAllUsers = async () => {
	const {data} = await api.get('users')
	console.log(data, 'getAllUsers')
	return data
}
