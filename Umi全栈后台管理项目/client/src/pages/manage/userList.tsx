import React, { useState } from 'react';
import { useMount } from 'ahooks';
import { Table, Card, Breadcrumb, Popover, Button, Modal, Form, Input, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import request from '@/utils/request';

const { TextArea } = Input;

const UserList: React.FC = () => {
  const [data, setData] = useState([])

  //更新用户信息弹框
  const showInfo = (values: any) => {
    Modal.info({
      title: '更新用户',
      content: (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onFinish={(data) => onFinish(data, values._id)}
        >
          <Form.Item label="用户名"
            name='username'
            rules={[{ required: true, message: '用户名为必填项!' }]}
          >
            <Input placeholder={values.username} />
          </Form.Item>
          <Form.Item label="密码"
            name='password'
          >
            <Input type='password' />
          </Form.Item>
          <Form.Item label="角色"
            name='role'
          >
            <Select defaultValue={String(values.role)}>
              <Select.Option value="1">管理员</Select.Option>
              <Select.Option value="2">编辑</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="个人简介"
            name='introduction'
          >
            <TextArea rows={4} defaultValue={values.introduction} />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType="submit">更新</Button>
          </Form.Item>
        </Form>
      ),
      // onOk() {},
      closable: true,
      okText: "取消",
      width: 580,
    });
  };

  useMount(async () => {
    const res = await request(`/adminapi/user/find`, {
      method: 'GET',
    })
    if (res.status === 1) {
      setData(res?.data || [])
    }
  })

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'username',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '角色',
      dataIndex: 'role',
      render: (val, record) => {
        if (String(val) === '1') return '管理员'
        else return '编辑'
      }
    },
    {
      title: '简介',
      dataIndex: 'introduction',
      render: (val) => {
        return (
          <>
            <Popover content={val}>
              <Button>简介</Button>
            </Popover>
          </>
        )
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

  const deleteHandle = async (id: string) => {
    const res = await request(`/adminapi/user/delete/${id}`, {
      method: 'GET',
    })
    console.log('res', res);

    if (res.status = 1) {
      console.log('删除用户成功~')
      setData(data.filter(item => item?._id !== id) || [])
    };
  }

  //表单提交
  const onFinish = async (values: any, id: string) => {
    const newObj = {...values}
    for (let key in newObj) {
      if(newObj[key] === undefined || '') {
        delete newObj[key]
      }
    }

    try {
      const res = await request(`/adminapi/user/update/${id}`, {
        method: 'POST',
        data: newObj,
      })
      if (res.status === 1) {
        console.log('更新用户成功~');
        setData(data.map(item => {
          if(item._id === id) {
            item = {...item, ...newObj}
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
      <Breadcrumb.Item>用户管理</Breadcrumb.Item>
      <Breadcrumb.Item>用户列表</Breadcrumb.Item>
    </Breadcrumb>
  )
  return <div>
    <Card title={getTitle}>
      <Table columns={columns} dataSource={data} rowKey="_id" />
    </Card>
  </div>
};

export default UserList;
