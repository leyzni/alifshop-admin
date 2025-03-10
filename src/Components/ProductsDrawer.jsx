import { Button, Drawer, Form, Input, InputNumber, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import Axios from '../api'
import { urls } from '../constants/urls'


function ProductsDrawer({ open, setOpen, getProducts, editingData }) {
    const [form] = Form.useForm()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        form.setFieldsValue(editingData)
    }, [editingData])

    const onFinish = (values) => {
        setLoading(true)
        if (editingData === null) {
            Axios.post(urls.products.post, values)
                .then(res => {
                    if (res.status === 201) {
                        getProducts()

                    }
                })
                .catch(err => {
                    console.log("Error:", err)
                }
                )
        } else {
            Axios.patch(urls.products.edit(editingData.id), values)
                .then(res => {
                    if(res.status === 200) {
                        getProducts()
                    }
                })
                .catch(err => console.log("Error:", err))
        }
        closeDrawer()

    }

    function closeDrawer() {
        setOpen(false)
        setLoading(false)
        form.resetFields()
    }
    return (
        <Drawer title="Basic Drawer" onClose={closeDrawer} open={open} width={500}>
            <Form
                form={form}
                initialValues={{
                    remember: true
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name="text"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Image!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Old Price"
                    name="old-price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Old price!'
                        }
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your price!'
                        }
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Is liked"
                    name="is_liked"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Is liked!'
                        }
                    ]}
                >
                    <Switch defaultChecked={false} />
                </Form.Item>

                <Form.Item label={null}>
                    <Button loading={loading} type="primary" htmlType="submit" className='submitbutton'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default ProductsDrawer