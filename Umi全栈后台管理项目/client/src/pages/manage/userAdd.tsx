import request from '@/utils/request';
import { PlusOutlined } from '@ant-design/icons';
import {
  Breadcrumb, Card, Form,
  Input,
  Button,
  Upload,
  Select
} from 'antd';
import { useState } from 'react';

const { TextArea } = Input;

export default function userAdd() {
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  //表单提交
  const onFinish = async (values: any) => {
    if (fileList.length) {
      values['avatar'] = fileList[0].originFileObj
    }
    console.log(values);

    const formData = new FormData()
    for (let i in values) {
      formData.append(i, values[i])
    }

    try {
      const res = await request(`/adminapi/user/add`, {
        method: 'POST',
        body: formData,
      })
      console.log(res);
      if (res.status === 1) {
        console.log('添加用户成功~');

      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTitle = (
    <Breadcrumb>
      <Breadcrumb.Item>用户管理</Breadcrumb.Item>
      <Breadcrumb.Item>添加用户</Breadcrumb.Item>
    </Breadcrumb>
  )

  return (
    <div>
      <Card title={getTitle}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
        >
          <Form.Item label="用户名"
            name='username'
            rules={[{ required: true, message: '用户名为必填项!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="密码"
            name='password'
            rules={[{ required: true, message: '密码为必填项!' }]}
          >
            <Input type='password' />
          </Form.Item>
          <Form.Item label="角色"
            name='role'
            rules={[{ required: true, message: '角色为必填项!' }]}
          >
            <Select>
              <Select.Option value="1">管理员</Select.Option>
              <Select.Option value="2">编辑</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="个人简介"
            name='introduction'
            rules={[{ required: true, message: '个人简介为必填项!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="头像" valuePropName="fileList"
            rules={[{ required: true, message: '头像为必填项!' }]}
          >
            <Upload
              action=""
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 1 && <PlusOutlined />}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType="submit">添加用户</Button>
          </Form.Item>
        </Form>
      </Card>

    </div>
  )
}
