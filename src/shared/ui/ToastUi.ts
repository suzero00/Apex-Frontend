import type {ToastOptions, ToastPosition} from 'react-toastify'
import {Bounce, toast} from 'react-toastify'

type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default'

interface ToastProps {
	message: string
	type?: ToastType
	delay?: number
	theme?: 'light' | 'dark'
	position?: ToastPosition
}

export const ToastUi = ({message, delay = 4000, theme = 'dark', type = 'default', position = 'top-right'}: ToastProps) => {
	const toastOptions: ToastOptions = {
		type,
		delay,
		theme,
		position,
		draggable: true,
		closeOnClick: true,
		pauseOnHover: false,
		style: {
			borderRadius: '4px',
			fontSize: 15,
		},
		transition: Bounce,
	}

	toast(message, toastOptions)
}
