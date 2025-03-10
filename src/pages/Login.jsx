import React, { useContext } from 'react'
import { Button, Form, Input, message } from 'antd';
import Axios from '../api';
import { urls } from '../constants/urls';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const { setUser } = useContext(AuthContext);


    const postLogin = (data) => {
        Axios.post(urls.auth, data).then(res => {
            console.log(res);
            if (res.status === 201) {
                
                localStorage.setItem("token", res.data.token)
                setUser()
            }2
        }).catch(err => {
            console.log(err);
            
            if (err.response.data.error === "Unauthorized") {
                message.error("Login yoki parol xato !!!")
            }
        })
    }

    const onFinish = (values) => {
        postLogin(values);
    };

    return (
        <div className='login-page'>
            <Form
                onFinish={onFinish}
                className='login-form'
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className='login-button'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login