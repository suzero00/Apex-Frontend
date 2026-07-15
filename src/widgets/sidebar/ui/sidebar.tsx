import {sidebarRoutes} from '@/shared/constants/sidebar-routes'
import s from './sidebar.module.scss'
import {Landmark, UserRound, LogOut} from 'lucide-react'
import {PageTitle} from '@/entities/page-title'
import {Link, useLocation, useNavigate} from 'react-router-dom'

export const Sidebar = () => {
	const pathname = useLocation().pathname
	const navigate = useNavigate()

	const handleLogout = () => {
		navigate('/login')
	}

	return (
		<aside className={s.sidebar}>
			<div className={s.brand}>
				<PageTitle icon={<Landmark size={28} />} title='Apex Bank' description='Online Banking' />
			</div>

			<nav className={s.menu}>
				<ul className={s.list}>
					{sidebarRoutes.map((link, i) => (
						<li key={i}>
							<Link className={`${s.link} ${pathname === link.route ? s.activeLink : ''}`} to={link.route}>
								{link.icon}
								<span>{link.name}</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<div className={s.features}>
				<PageTitle icon={<UserRound size={20} />} title='Sultan Tamaev' description='Premium Account' />
				<button className={s.logoutBtn} onClick={handleLogout} aria-label='Log out'>
					<LogOut size={18} />
				</button>
			</div>
		</aside>
	)
}
