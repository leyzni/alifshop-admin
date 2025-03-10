import { Banners, Brands, Dashboard, Products } from '../pages'

export const routes = [
	{
		path: '/',
		element: <Dashboard />,
	},
	{
		path: '/banners',
		element: <Banners />,
	},
	{
		path: '/brands',
		element: <Brands />,
	},
	{
		path: '/products',
		element: <Products />,
	},
]
