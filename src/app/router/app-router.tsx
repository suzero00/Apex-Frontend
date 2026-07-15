import {MainPage} from '@/pages/main/ui/main-page'
import {Routes, Route} from 'react-router-dom'
import {MainLayout} from '../layouts/main'
import {NotFoundPage} from '@/pages/not-found'

export const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route index element={<MainPage />} />
			</Route>
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	)
}
