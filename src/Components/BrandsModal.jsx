import { Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'
import { urls } from '../constants/urls'
import Axios from '../api'

function BrandsModal({ isModalOpen, setIsModalOpen, getBrands,editingData, setEditigData}) {
	const [form] = Form.useForm()
	const closeModal = () => {
		setIsModalOpen(false)
		form.resetFields()
		setEditigData(null)
	}

	const handleOk = () => {
		form.submit()
	}

	useEffect(() => {
		form.setFieldsValue(editingData)
	}, [editingData])

	const handleFinish = values => {
	if (editingData === null) {
		Axios.post(urls.brands.post, values).then(res => {
			if (res.status === 201) {
				getBrands()
			}
		})
			.catch(err => console.log("Error:", err))
	}else{
		Axios.patch(urls.brands.edit(editingData.id),values) .then(res =>{
			if(res.status === 200){
				getBrands()
			}
		})
	}
	closeModal();
	}
	return (
		<Modal
			title={editingData ? "Edit Banner" : "Add Banner"} 
			onOk={handleOk}
			open={isModalOpen}
			okText = {editingData ? "Edit " : "Add "}
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
					<Input type='url' />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default BrandsModal
