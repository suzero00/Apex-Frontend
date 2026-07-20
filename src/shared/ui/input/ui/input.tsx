import {ChangeEvent, useState} from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa'
import {InputErrorIcon} from '@/shared/assets/icons/input_error_icon'

import s from './input.module.scss'

interface InputProps {
	title: string
	className?: string
	value?: string
	placeholder: string
	type: string
	error?: string // TODO убрать .?
	disabled: boolean
	maxLength: number
	isPassword?: boolean
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputUi = ({
	className,
	onChange,
	value,
	type = 'text',
	title,
	placeholder,
	error,
	disabled,
	maxLength,
	isPassword = false,
	...props
}: InputProps) => {
	const [inputType, setInputType] = useState(type)

	return (
		<label className={s.container}>
			{title}

			<div className={s.input_wrapper}>
				<input
					type={inputType}
					value={value}
					onChange={onChange}
					maxLength={maxLength}
					placeholder={placeholder}
					className={`${className} ${s.input} ${disabled && s.disabled}`}
					disabled={disabled}
					{...props}
				/>

				{isPassword &&
					(inputType === 'password' ? (
						<FaRegEye onClick={() => setInputType('text')} />
					) : (
						<FaRegEyeSlash
							onClick={() => setInputType('password')}
						/>
					))}
			</div>

			{error && (
				<div className={s.error_wrapper}>
					<InputErrorIcon size='16' color='#ed1c24' />
					<span className={s.error}>{error}</span>
				</div>
			)}
		</label>
	)
}
