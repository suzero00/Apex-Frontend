import type {ButtonHTMLAttributes} from 'react'
import s from './button.module.scss'

export const ButtonUi = ({
	className = '',
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button {...props} className={`${s.button} ${className}`}>
			{props.children}
		</button>
	)
}
