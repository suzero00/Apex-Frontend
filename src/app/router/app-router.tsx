import {Routes, Route} from 'react-router-dom'
import {MainLayout} from '../layouts/main'
import {NotFound} from '@/pages/not-found'
import {Main} from '@/pages/main'
import {SignUp} from '@/pages/auth/sign-up'
import {SignIn} from '@/pages/auth/sign-in'
import {AuthLayout} from '../layouts/auth'

export const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route index element={<Main />} />
			</Route>
			<Route path='auth/' element={<AuthLayout />}>
				<Route path='sign-in' element={<SignIn />} />
				<Route path='sign-up' element={<SignUp />} />
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}
