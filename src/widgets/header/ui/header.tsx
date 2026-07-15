// Header.tsx
import s from './header.module.scss'

export const Header = () => {
	return (
		<header className={s.header}>
			<div className={s.container}>
				<h1 className={s.title}>
					Apex <span className={s.accent}>Bank</span>
				</h1>
				<div className={s.status}>
					<span className={s.badge}>Online Banking</span>
				</div>
			</div>
		</header>
	)
}
