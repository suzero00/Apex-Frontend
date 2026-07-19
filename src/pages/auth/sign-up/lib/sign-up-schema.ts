import {z} from 'zod'

export const baseSignUpSchema = z.object({
	email: z.string().min(3, {message: 'Почта должна иметь минимум 3 символа'}),
	password: z
		.string()
		.min(3, {message: 'Пароль должен иметь минимум 3 символа'}),
	confirmPassword: z.string().min(3, {message: 'Повторите пароль'}),
})

export const signUpSchema = baseSignUpSchema.refine(
	data => data.password === data.confirmPassword,
	{
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	},
)

export type SignUpBody = z.infer<typeof signUpSchema>
