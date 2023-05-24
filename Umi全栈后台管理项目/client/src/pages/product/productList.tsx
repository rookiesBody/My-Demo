import React, { useState } from 'react';
import { useMount } from 'ahooks';
import { useSelector } from 'dva';
import { Table, Card, Breadcrumb, Popover, Button, Modal, Form, Input, Select, Switch, Tag, Image, Divider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import request from '@/utils/request';
import { formatTime } from '@/utils/utils';

const { TextArea } = Input

const NewsList: React.FC = () => {
  const { userInfo } = useSelector((state: any) => state.user) || {};
  const [data, setData] = useState([])

  //更新用户信息弹框
  const showInfo = (values: any) => {
    Modal.info({
      title: '更新产品信息',
      content: (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ minWidth: 800 }}
          onFinish={(data) => onFinish(data, values._id)}
          initialValues={{
            title: values.title,
            quickDesc: values.quickDesc,
            detailDesc: values.detailDesc,
          }}
        >
          <Form.Item label="标题"
            name='title'
          >
            <Input />
          </Form.Item>
          <Form.Item label="商品简要描述"
            name='quickDesc'
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="商品详细描述"
            name='detailDesc'
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType="submit">更新</Button>
          </Form.Item>
        </Form>
      ),

      closable: true,
      okText: "取消",
      width: 750,
    });
  };

  useMount(async () => {
    const res = await request(`/proapi/product/find/${userInfo.id || JSON.parse(localStorage.getItem("user") || '')?.id}`, {
      method: 'GET',
    })
    if (res.status === 1) {
      console.log(res);

      setData(res?.data || [])
    }
  })

  const columns: ColumnsType<any> = [
    {
      title: '产品封面',
      dataIndex: 'cover',
      width: 120,
      render: (text) => <Image
        width={80}
        src={`http://localhost:3000${text}`}
      />,
    },
    {
      title: '产品名称',
      dataIndex: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '简要概述',
      dataIndex: 'quickDesc',
      render: (val, values) => {
        return (
          <>
            <Popover content={<>
              <div style={{fontSize:'14px', color: '#333'}}>{val}</div>
            </>}>
              <Button>预览</Button>
            </Popover>
          </>
        )
      }
    },
    {
      title: '更新时间',
      dataIndex: 'editTime',
      render: (text) => <a>{formatTime(text)}</a>,
    },
    {
      title: '操作',
      render: (_, values) => (
        <>
          <Button onClick={() => showInfo(values)}>更新</Button>&nbsp;&nbsp;&nbsp;&nbsp;
          <Button danger onClick={() => deleteHandle(values._id)}>删除</Button>
        </>
      ),
    },
  ];

  //删除新闻
  const deleteHandle = async (id: string) => {
    const res = await request(`/proapi/product/delete/${id}`, {
      method: 'GET',
    })
    console.log('res', res);

    if (res.status = 1) {
      console.log('删除新闻成功~')
      setData(data.filter(item => item?._id !== id) || [])
    };
  }

  //表单提交
  const onFinish = async (values: any, id: string) => {
    const newObj = { ...values }
    console.log('newObj', newObj);
    for (let key in newObj) {
      if (newObj[key] === undefined || '' || null) {
        delete newObj[key]
      }
    }

    try {
      const res = await request(`/proapi/product/update/${id}`, {
        method: 'POST',
        data: newObj,
      })
      if (res.status === 1) {
        console.log('更新产品信息成功~');
        setData(data.map(item => {
          if (item._id === id) {
            item = { ...item, ...newObj }
            return item
          }
          return item
        }) || [])
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTitle = (
    <Breadcrumb>
      <Breadcrumb.Item>产品管理</Breadcrumb.Item>
      <Breadcrumb.Item>产品列表</Breadcrumb.Item>
    </Breadcrumb>
  )

  return <div className='newsList'>
    <Card title={getTitle}>
      <Table columns={columns} dataSource={data} rowKey="_id" />
    </Card>
  </div>
};

export default NewsList;
