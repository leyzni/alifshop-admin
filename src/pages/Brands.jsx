import React, { useEffect, useState } from 'react'
import { urls } from '../constants/urls'
import { Button, Card, Flex, Popconfirm, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Axios from '../api'
import BrandsModal from '../Components/BrandsModal'
const { Meta } = Card

function Brands() {
	const [brands, setBrands] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editingData, setEditingData] = useState(null);

	const showModal = () => {
		setIsModalOpen(true)
	}

	function getBrands() {
		Axios.get(urls.brands.get).then(res => setBrands(res.data))
	}

	useEffect(() => {
		getBrands()
	}, [])



	const handleClick = data => {
		Axios.delete(urls.brands.delete(data.id))
			.then(res => {
				if (res.status == 200) {
					getBrands()
				}
			})
			.catch(err => console.log('error: ', err))
	}
	const handleEdit = (data) => {
		setEditingData(data);
		setIsModalOpen(true);
	  }

	return (
		<>
			<Flex justify='flex-end'>
				<Button type='primary' className='add-banner' onClick={showModal}>
					+ Add product
				</Button>
			</Flex>
			<Space wrap size={24}>
				{brands.map(item => (
					<Card
						size='small'
						key={item.id}
						style={{
							width: '150px',
							height: '240px',
						}}
						cover={<img alt={item.name} src={item.img} />}
						actions={[
							<EditOutlined  key="edit" onClick={() => handleEdit(item)} />,
							<Popconfirm
								title='Delete the task'
								description='Are you sure to delete this task?'
								onConfirm={() => handleClick(item)}
								okText='Yes'
								cancelText='No'
							>
								<DeleteOutlined key='delete' />
							</Popconfirm>,
						]}
					>
						<Meta title={item.name} />
					</Card>
				))}
			</Space>
			<BrandsModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				getBrands={getBrands}
				editingData={editingData}
				setEditingData={setEditingData}
			/>
		</>
	)
}

export default Brands
