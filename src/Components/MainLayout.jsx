import React, { useState } from 'react'
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Flex, Layout, Menu, Typography } from 'antd'
import { Data } from '../constants/data'
import { Route, Routes } from 'react-router-dom'
import { routes } from '../constants/routes'
import Logout from '../pages/Logout'
const { Header, Sider, Content } = Layout

function MainLayout() {
	const [collapsed, setCollapsed] = useState(false)

	const handleClick = () => {
		setCollapsed(!collapsed)
	}

	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className='demo-logo-vertical' />
				<Menu
					theme='light'
					mode='inline'
					defaultSelectedKeys={['1']}
					items={Data}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Button
						type='text'
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => handleClick()}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>
					<Logout>
						<Flex align='center' gap={12} style={{ cursor: 'pointer' }}>
							<Avatar size='large' icon={<UserOutlined />} />
							<Typography>John Wick</Typography>
						</Flex>
					</Logout>
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
					}}
				>
					<Routes>
						{routes.map(item => (
							<Route path={item.path} element={item.element} key={item.path} />
						))}
					</Routes>
				</Content>
			</Layout>
		</Layout>
	)
}

export default MainLayout
