import {useNavigate} from 'react-router-dom'
import {AppRouter} from './router/app-router'
import {useEffect} from 'react'

export const App = () => {
	const navigate = useNavigate()
	const token = localStorage.getItem('accessToken')
	// useEffect(() => {
	// 	if (!token) navigate('/auth/sign-in')
	// }, [token])
	// TODO исключить публичные роуты из useEffect

	return <AppRouter />
}
