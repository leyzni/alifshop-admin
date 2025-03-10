import {
	BorderInnerOutlined,
	ProductOutlined,
	DashboardOutlined,
	RightSquareOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

export const Data = [
	{
		key: '1',
		icon: <DashboardOutlined />,
		label: <Link to='/dashboard'>Dashboard</Link>,
	},
	{
		key: '2',
		icon: <ProductOutlined />,
		label: <Link to='/products'>Products</Link>,
	},
	{
		key: '4',
		icon: <RightSquareOutlined />,
		label: <Link to='/brands'>Brands</Link>,
	},
	{
		key: '5',
		icon: <BorderInnerOutlined />,
		label: <Link to='/banners'>Banners</Link>,
	},
]
