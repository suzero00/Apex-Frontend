import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {observer} from 'mobx-react-lite'
import {zodResolver} from '@hookform/resolvers/zod'
import {SignUpBody, signUpSchema} from '../lib/sign-up-schema'
import {ButtonUi} from '@/shared/ui/button'
import {InputUi} from '@/shared/ui/input'
import {authStore} from '@/shared/store'
import s from './sign-up.module.scss'

export const SignUp = observer(() => {
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<SignUpBody>({
		resolver: zodResolver(signUpSchema),
	})

	useEffect(() => {
		authStore.clearError()
	}, [])

	const onSubmit = async (data: SignUpBody) => {
		try {
			await authStore.signUpAction(data)
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
			<h1 className={s.title}>Регистрация в личный кабинет</h1>

			<p className={s.subtitle}>Пожалуйста, введите данные для входа</p>

			<div className={s.inputs}>
				<InputUi
					title='Электронная почта'
					type='email'
					placeholder='Введите email'
					disabled={pending}
					maxLength={50}
					error={errors.email?.message || error || undefined}
					{...register('email')}
				/>

				<InputUi
					isPassword
					title='Пароль'
					type='password'
					placeholder='Введите пароль'
					disabled={pending}
					maxLength={50}
					error={errors.password?.message}
					{...register('password')}
				/>

				<InputUi
					isPassword
					title='Подтвердить пароль'
					type='password'
					placeholder='••••••••••'
					disabled={pending}
					maxLength={50}
					error={errors.confirmPassword?.message}
					{...register('confirmPassword')}
				/>
			</div>

			<div className={s.features}>
				<ButtonUi type='submit' disabled={pending} className={s.btn}>
					{pending ? 'Регистрация...' : 'Зарегистрироваться'}
				</ButtonUi>
			</div>

			<div className={s.links}>
				<Link className={s.link_to_sign_in} to='/auth/sign-in'>
					Войти в личный аккаунт?
				</Link>
			</div>
		</form>
	)
})
