import {useNavigate} from 'react-router-dom'
import s from './not-found-page.module.scss'

export const NotFoundPage = () => {
	const navigate = useNavigate()

	return (
		<div className={s.container}>
			<h1>Page not found!</h1>
			<p>
				<span>обновить страницу</span> или <span onClick={() => navigate(-1)}>вернуться назад</span>
			</p>
		</div>
	)
}
