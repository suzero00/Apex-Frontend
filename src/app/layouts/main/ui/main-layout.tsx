import s from './main-layout.module.scss'
import {Suspense} from 'react'
import {Footer} from '@/widgets/footer'
import {PageLoader} from '@/widgets/page-loader'
import {Outlet} from 'react-router-dom'
import {Sidebar} from '@/widgets/sidebar'
import {Header} from '@/widgets/header'

export const MainLayout = () => {
	return (
		<div className='app'>
			<Header />
			<div className={s.app_wrapper}>
				<Sidebar />
				<div className={s.app_content}>
					<Suspense fallback={<PageLoader />}>
						<Outlet />
					</Suspense>
				</div>
			</div>
			<Footer />
		</div>
	)
}
