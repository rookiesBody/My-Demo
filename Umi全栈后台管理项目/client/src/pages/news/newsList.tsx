import React, { useState, useRef } from 'react';
import { useMount } from 'ahooks';
import { useSelector } from 'dva';
import { Table, Card, Breadcrumb, Popover, Button, Modal, Form, Input, Select, Switch, Tag, Image, Divider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import request from '@/utils/request';
import Editor from './component/editor/editor';
import { formatTime } from '@/utils/utils';

const NewsList: React.FC = () => {
  const { userInfo } = useSelector((state: any) => state.user) || {};

  const [data, setData] = useState([])
  let ref = useRef()

  const getHTMLHandle = (data: any) => {
    console.log('HTML', data);
    ref.current = data
  }

  //更新用户信息弹框
  const showInfo = (values: any) => {
    Modal.info({
      title: '更新用户',
      content: (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ minWidth: 800 }}
          onFinish={(data) => onFinish(data, values._id)}
          initialValues={{
            category: values.category
          }}
        >
          <Form.Item label="标题"
            name='title'
          >
            <Input placeholder={values.title} />
          </Form.Item>
          <Form.Item label="内容"
            name='content'
          >
            <Editor getHTMLHandle={getHTMLHandle} content={values.content} />
          </Form.Item>
          <Form.Item label="类别"
            name='category'
          >
            <Select defaultValue={values.category}>
              <Select.Option value="1">最新动态</Select.Option>
              <Select.Option value="2">典型案例</Select.Option>
              <Select.Option value="3">通知公告</Select.Option>
            </Select>
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
    const res = await request(`/newsapi/news/find/${userInfo.id || JSON.parse(localStorage.getItem("user") || '')?.id}`, {
      method: 'GET',
    })
    if (res.status === 1) {
      console.log(res);

      setData(res?.data || [])
    }
  })

  const columns: ColumnsType<any> = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (text) => <Image
        width={80}
        src={`http://localhost:3000${text}`}
      />,
    },
    {
      title: '标题',
      dataIndex: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '类别',
      dataIndex: 'category',
      render: (val, record) => {
        if (val === '1') return <Tag color="red">最新动态</Tag>
        else if (val === '2') return <Tag color="green">典型案例</Tag>
        else return <Tag color="blue">通知公告</Tag>
      }
    },
    {
      title: '预览',
      dataIndex: 'content',
      render: (val, values) => {
        return (
          <>
            <Popover content={<>
              <h2>{values.title}</h2>
              <div style={{fontSize:'12px', color: '#999'}}>{formatTime(values.editTime)}</div>
              <Divider />
              <div dangerouslySetInnerHTML={{__html: val}}/>
            </>}>
              <Button>预览</Button>
            </Popover>
          </>
        )
      }
    },
    {
      title: '发布时间',
      dataIndex: 'editTime',
      render: (text) => <a>{formatTime(text)}</a>,
    },
    {
      title: '发布状态',
      dataIndex: 'isPublish',
      render: (val, record) => {
        if (val === 1) return <Switch onChange={(float) => onChange(float, record._id)} />
        else return <Switch defaultChecked onChange={(float) => onChange(float, record._id)} />
      }
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
    const res = await request(`/newsapi/news/delete/${id}`, {
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
    const newObj = { ...values, content: ref.current }
    console.log('newObj', newObj);
    for (let key in newObj) {
      if (newObj[key] === undefined || '' || null) {
        delete newObj[key]
      }
    }

    try {
      const res = await request(`/newsapi/news/update/${id}`, {
        method: 'POST',
        data: newObj,
      })
      if (res.status === 1) {
        console.log('更新新闻成功~');
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

  // 发布按钮状态
  const onChange = async (checked: boolean, id: string) => {
    console.log(checked);
    try {
      const res = await request(`/newsapi/news/update/${id}`, {
        method: 'POST',
        data: {
          isPublish: checked ? 2 : 1
        },
      })
      if (res.status === 1) {
        console.log('更新发布状态成功~');
        setData(data.map(item => {
          if (item._id === id) {
            item = { ...item, isPublish: checked ? 2 : 1 }
            return item
          }
          return item
        }) || [])
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getTitle = (
    <Breadcrumb>
      <Breadcrumb.Item>用户管理</Breadcrumb.Item>
      <Breadcrumb.Item>新闻</Breadcrumb.Item>
    </Breadcrumb>
  )

  return <div className='newsList'>
    <Card title={getTitle}>
      <Table columns={columns} dataSource={data} rowKey="_id" />
    </Card>
  </div>
};

export default NewsList;
