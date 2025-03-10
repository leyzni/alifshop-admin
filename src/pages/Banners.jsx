import React, { useEffect, useState } from 'react'
import { urls } from '../constants/urls'
import { Button, Card, Flex, Popconfirm, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Axios from '../api';
import BannerModal from '../Components/BannerModal';
const { Meta } = Card;

function Banners() {

  const [banners, setBanners] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };


  function getBanners() {
    Axios.get(urls.banners.get).then(res => setBanners(res.data))

  }

  useEffect(() => {
    getBanners()
  }, [])


  const handleClick = (data) => {
    Axios.delete(urls.banners.delete(data.id)).then(res => {
      if (res.status == 200) {
        getBanners()
      }
    })
      .catch(err => console.log("error: ", err))

  }

  return (
    <>
      <Flex justify='flex-end'>
        <Button type='primary' className='add-banner'
          onClick={showModal}
        >+ Add product</Button>
      </Flex>
      <Space wrap size={24}>
        {
          banners.map(item => (
            <Card
              key={item.id}
              style={{
                width: 300,
              }}
              cover={
                <img
                  alt={item.name}
                  src={item.img}
                />
              }
              actions={[
                <EditOutlined key="edit" />,

                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => handleClick(item)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined key='delete' />
                </Popconfirm>

              ]}
            >
              <Meta title={item.name} />
            </Card>))
        }
      </Space>
      <BannerModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} getBanners={getBanners} />
    </>
  )
}

export default Banners