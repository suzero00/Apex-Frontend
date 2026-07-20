import {ButtonUi} from '@/shared/ui/button'
import s from './main.module.scss'
import {usersStore} from '@/shared/store'
import {observer} from 'mobx-react-lite'

export const Main = observer(() => {
	const handleGetUsers = async () => {
		try {
			const data = await usersStore.getAllUsersAction()
			console.log('Пользователи успешно загружены:', data)
		} catch (error) {
			console.log(error, 'handleGetUsers MainPage')
		}
	}

	const pending = usersStore.isLoading

	return (
		<div className={s.container}>
			<div className={s.greetings}>
				<h1>Welcome back, Sultan!</h1>
				<span>Monday, July 14, 2026 · 09:42 AM</span>
				<ButtonUi onClick={handleGetUsers} disabled={pending}>
					{pending ? 'Загрузка' : 'Получить всех пользователей'}
				</ButtonUi>
			</div>
		</div>
	)
})
