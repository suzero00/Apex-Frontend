import {Link, useLocation, useNavigate} from 'react-router-dom'
import {UserRound, LogOut} from 'lucide-react'
import {FaAppStoreIos} from 'react-icons/fa6'
import {PageTitle} from '@/entities/page-title'
import {sidebarRoutes} from '@/shared/constants/sidebar-routes'
import {authStore} from '@/shared/store'
import s from './sidebar.module.scss'

export const Sidebar = () => {
	const pathname = useLocation().pathname
	const navigate = useNavigate()

	const handleLogout = async () => {
		try {
			await authStore.logoutAction()
			navigate('/auth/sign-in')
			console.log('выход из аккаунта успешен')
		} catch (error) {}
	}

	const user = authStore.user
	const userName = user ? `${user.email}` : 'Гость' // TODO: getMe endpoint

	return (
		<aside className={s.sidebar}>
			<div className={s.brand}>
				<PageTitle
					icon={<FaAppStoreIos size={28} />}
					title='Apex'
					description='Social Network'
				/>
			</div>

			<nav className={s.menu}>
				<ul className={s.list}>
					{sidebarRoutes.map((link, i) => (
						<li key={i}>
							<Link
								className={`${s.link} ${pathname === link.route ? s.activeLink : ''}`}
								to={link.route}
							>
								{link.icon}
								<span>{link.name}</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<div className={s.features}>
				<PageTitle
					icon={<UserRound color='rgba(15, 26, 103, 1)' size={20} />}
					title={userName}
					description='Premium Account'
				/>
				<button
					className={s.logoutBtn}
					onClick={handleLogout}
					aria-label='Log out'
				>
					<LogOut color='rgba(15, 26, 103, 1)' size={18} />
				</button>
			</div>
		</aside>
	)
}
