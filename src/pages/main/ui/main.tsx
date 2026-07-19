import {ButtonUi} from '@/shared/ui/button'
import s from './main.module.scss'
import {usersStore} from '@/shared/store'

export const Main = () => {
	return (
		<div className={s.container}>
			<div className={s.greetings}>
				<h1>Welcome back, Sultan!</h1>
				<span>Monday, July 14, 2026 · 09:42 AM</span>
				<ButtonUi onClick={() => console.log(usersStore.getAllUsersAction())}>Get all users button</ButtonUi>
			</div>
		</div>
	)
}
