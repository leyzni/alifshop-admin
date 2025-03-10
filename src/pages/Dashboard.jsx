import { Col, Row, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
import Axios from '../api'
import { urls } from '../constants/urls'

function Dashboard() {
	const [products, setProducts] = useState([])
	const [banners, setBanners] = useState([])

	function getProducts() {
		Axios.get(urls.products.get).then(res => setProducts(res.data))
	}
	function getBanners() {
		Axios.get(urls.banners.get).then(res => setBanners(res.data))
	}

	useEffect(() => {
		getProducts()
		getBanners()
	}, [])
	return (
		<Row gutter={16}>
			<Col span={12}>
				<Statistic title='Products' value={products.length} />
			</Col>
			<Col span={12}>
				<Statistic title='Banners' value={banners.length} />
			</Col>
		</Row>
	)
}

export default Dashboard
