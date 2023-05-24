import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Carousel, Row, Col, Avatar } from 'antd';
import { useSelector } from 'dva';
import { useMount } from 'ahooks';
import request from '@/utils/request';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  fontSize: '32px',
  fontWeight: 900,
  lineHeight: '160px',
  textAlign: 'center',
  position: 'absolute',
  left: '50%',
};

const Home: React.FC = () => {
  const { userInfo } =
    useSelector((state: any) => state.user) || {};

  const [data, setData] = useState([])

  useMount(async () => {
    const res = await request(`/proapi/product/find/${userInfo.id || JSON.parse(localStorage.getItem("user") || '')?.id}`, {
      method: 'GET',
    })
    if (res.status === 1) {
      console.log(res);

      setData(res?.data || [])
    }
  })
  return (
    <div>
      <Card>
        <Breadcrumb>
          <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col span={6}>
            {
              userInfo.avatar ?
                <Avatar size={100} src={<img src={`http://localhost:3000${userInfo.avatar}`} alt="avatar" />} /> :
                <Avatar size={100} icon={<UserOutlined />} />
            }
          </Col>
          <Col span={18}>
            <span style={{ marginTop: '50px', fontSize: '20px', fontWeight: 700 }}>欢迎回来：{userInfo.username || '张三'}</span>
          </Col>
        </Row>

      </Card>

      <Card title={<h1>公司产品</h1>}>
        <Carousel autoplay>
          {data.map((item: any) => <div>
            <div style={{ position: 'relative', width: '800px', height: '500px' }}>
              <h3 style={contentStyle}>{item.title}</h3>
              <img src={`http://localhost:3000${item.cover}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>)}
        </Carousel>
      </Card>
    </div>
  )
};

export default Home;
