import {ChartNoAxesColumnIncreasing, Bolt, WrenchOff, ArrowRightLeft, CreditCard, LayoutDashboard} from 'lucide-react'

export const sidebarRoutes = [
	{
		route: '/',
		name: 'Dashboard',
		icon: <LayoutDashboard />,
	},
	{
		route: '/Cards',
		name: 'My Cards & Accounts',
		icon: <CreditCard />,
	},
	{
		route: '/Transfers',
		name: 'Transfers & Payments',
		icon: <ArrowRightLeft />,
	},
	{
		route: '/Analytics',
		name: 'Analytics & Expenses',
		icon: <ChartNoAxesColumnIncreasing />,
	},
	{
		route: '/Services',
		name: 'Services & Utilities',
		icon: <WrenchOff />,
	},
	{
		route: '/Settings',
		name: 'Settings',
		icon: <Bolt />,
	},
]
