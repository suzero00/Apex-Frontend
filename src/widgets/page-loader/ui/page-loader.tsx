import {Loader} from '@/shared/ui/loader'
import s from './page-loader.module.scss'

export const PageLoader = () => {
	return (
		<div className={s.container}>
			<Loader />
		</div>
	)
}
