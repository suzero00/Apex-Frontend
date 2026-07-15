import React from 'react'
import s from './main-page.module.scss'

export const MainPage = () => {
	return (
		<div className={s.container}>
			<div className={s.greetings}>
				<h1>Welcome back, Sultan!</h1>
				<span>Monday, July 14, 2026 · 09:42 AM</span>
			</div>
		</div>
	)
}
