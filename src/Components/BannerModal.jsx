import { Form, Input, Modal } from 'antd'
import React from 'react'
import Axios from '../api'
import { urls } from '../constants/urls'

function BannerModal({ isModalOpen, setIsModalOpen, getBanners }) {
	const [form] = Form.useForm()
	const closeModal = () => {
		setIsModalOpen(false)
		form.resetFields()
	}

	const handleOk = () => {
		form.submit()
	}

	const handleFinish = values => {
		Axios.post(urls.banners.post, values)
			.then(res => {
				if (res.status === 201) {
					getBanners()
				}
			})
			.catch(err => console.log('ERROR', err))

		closeModal()
	}

	return (
		<Modal
			title='Basic Modal'
			open={isModalOpen}
			onOk={handleOk}
			onCancel={closeModal}
		>
			<Form
				form={form}
				initialValues={{
					remember: true,
				}}
				onFinish={handleFinish}
				autoComplete='off'
			>
				<Form.Item
					label='Name'
					name='name'
					rules={[
						{
							required: true,
							message: 'Please input your Name!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Image'
					name='img'
					rules={[
						{
							required: true,
							message: 'Please input your Image!',
						},
					]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default BannerModal
