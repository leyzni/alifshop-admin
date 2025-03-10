export const urls = {
	products: {
		get: '/product',
		post: '/product',
		delete: id => `/product/${id}`,
		edit: id => `/product/${id}`,
	},
	banners: {
		get: '/banners',
		post: '/banners',
		delete: id => `/banners/${id}`,
		edit: id => `/banners/${id}`,
	},
	brands: {
		get: '/brands',
		post: '/brands',
		delete: id => `/brands/${id}`,
		edit: id => `/brands/${id}`,
	},
	auth: '/auth',
}
