import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import {authStore} from '@/shared/store'
import {ButtonUi} from '@/shared/ui/button'
import {InputUi} from '@/shared/ui/input'
import s from './sign-in.module.scss'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {SignInBody, signInSchema} from '../lib/sign-in-schema'

export const SignIn = observer(() => {
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<SignInBody>({
		resolver: zodResolver(signInSchema),
	})

	useEffect(() => {
		authStore.clearError()
	}, [])

	const onSubmit = async (data: SignInBody) => {
		try {
			await authStore.signInAction(data)
			navigate('/')
			console.log('Вход прошел успешно! Добро пожаловать!')
		} catch (error) {
			console.error('Ошибка авторизации:', error)
		}
	}

	const error = authStore.error
	const pending = authStore.isLoading

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={s.container}>
			<h1 className={s.title}>Вход в личный кабинет</h1>

			<p className={s.subtitle}>Пожалуйста, введите данные для входа</p>

			<div className={s.inputs}>
				<InputUi
					title='Электронная почта'
					type='email'
					placeholder='Введите email'
					maxLength={50}
					disabled={pending}
					error={errors.email?.message || error || undefined}
					{...register('email')}
				/>

				<InputUi
					isPassword
					title='Пароль'
					type='password'
					placeholder='Введите пароль'
					maxLength={50}
					disabled={pending}
					error={errors.password?.message}
					{...register('password')}
				/>
			</div>

			<div className={s.features}>
				<ButtonUi type='submit' disabled={pending} className={s.btn}>
					{pending ? 'Вход...' : 'Войти'}
				</ButtonUi>
			</div>

			<div className={s.links}>
				<Link
					className={s.link_forgot_password}
					to='/auth/forgot-password'
				>
					Забыли пароль?
				</Link>
				<Link className={s.link_to_sign_up} to='/auth/sign-up'>
					Нет личного кабинета?
				</Link>
			</div>
		</form>
	)
})
