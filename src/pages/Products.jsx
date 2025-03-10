import { Button,  Flex,  Image, Popconfirm, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import Axios from '../api'
import ProductsDrawer from '../Components/ProductsDrawer'
import { urls } from '../constants/urls'


function Products() {
  const [products, setProducts] = useState([])
  const [open, setOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const[editingData, setEditingData] = useState(null)

  const handleDelete = (data) => {
    Axios.delete(urls.products.delete(data.id)).then(res => console.log(res)).catch(err => console.
      log("Error:", err)).finally(() => {
        getProducts()
      })
  }

const handleEdit = (data) => {
  showDrawer()
  setEditingData(data)
}

  const onConfirm = (item) => {
    handleDelete(item)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'text',
      key: 'text',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => (
        <Image src={record.image} width={100} />
      )
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => onConfirm(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button color='danger' variant='outlined' loading={deleteLoading}>Delete</Button>
          </Popconfirm>
        </Space >
      )
    }
  ]

  function getProducts() {
    Axios.get(urls.products.get).then(res => setProducts(res.data)
    )
  }

  function showDrawer() {
    setOpen(true)  
  }


  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <Flex justify='flex-end'>
        <Button type='primary' className='add-button' onClick={showDrawer}>+ Add product</Button>
      </Flex>
      <Table columns={columns} dataSource={products} rowKey={"id"} />
      <ProductsDrawer open={open} setOpen={setOpen} getProducts={getProducts}  editingData={editingData} />
    </>
  )
}

export default Products