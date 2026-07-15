// Footer.tsx
import s from './footer.module.scss'

export const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className={s.footer}>
			<div className={s.container}>
				<p className={s.copy}>&copy; {currentYear} Apex Bank. All rights reserved.</p>
				<div className={s.links}>
					<a href='#privacy' className={s.link}>
						Privacy Policy
					</a>
					<a href='#terms' className={s.link}>
						Terms of Service
					</a>
				</div>
			</div>
		</footer>
	)
}
