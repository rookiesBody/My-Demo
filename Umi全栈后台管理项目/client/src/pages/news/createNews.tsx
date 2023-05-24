import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import {
  Card, Breadcrumb, Form,
  Input,
  Button,
  Upload,
  Select
} from 'antd'
import { useSelector } from 'dva';
import request from '@/utils/request';
import Editor from './component/editor/editor';

export default function CreateNews() {
  const { userInfo } = useSelector((state: any) => state.user) || {};

  const [fileList, setFileList] = useState([]);
  const [ediHTML, setEdiHTML] = useState<any>(null);

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
      values['cover'] = fileList[0].originFileObj
    }
    values['content'] = ediHTML
    values['uid'] = userInfo.id || JSON.parse(localStorage.getItem("user") || '')?.id

    console.log(values);

    const formData = new FormData()
    for (let i in values) {
      formData.append(i, values[i])
    }

    try {
      const res = await request(`/newsapi/news/add`, {
        method: 'POST',
        body: formData,
      })
      console.log(res);
      if (res.status === 1) {
        console.log('上传新闻成功~');

      }
    } catch (err) {
      console.log(err);
    }
  };

  const getHTMLHandle = (data: any) => {
    console.log('HTML', data);
    setEdiHTML(data)
  }

  const getTitle = (
    <Breadcrumb>
      <Breadcrumb.Item>用户管理</Breadcrumb.Item>
      <Breadcrumb.Item>创建新闻</Breadcrumb.Item>
    </Breadcrumb>
  )
  return (
    <div>
      <Card title={getTitle}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ minWidth: 1200 }}
          onFinish={onFinish}
          initialValues={{
            category: '1'
          }}
        >
          <Form.Item label="标题"
            name='title'
            rules={[{ required: true, message: '标题为必填项!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="内容"
            name='content'
            rules={[{ required: ediHTML ? false : true, message: '内容为必填项!' }]}
          >
            <Editor getHTMLHandle={getHTMLHandle} />
          </Form.Item>
          <Form.Item label="类别"
            name='category'
            rules={[{ required: false, message: '类别为必填项!' }]}
          >
            <Select defaultValue='1'>
              <Select.Option value="1">最新动态</Select.Option>
              <Select.Option value="2">典型案例</Select.Option>
              <Select.Option value="3">通知公告</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="封面图片" valuePropName="fileList"
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
            <Button type='primary' htmlType="submit">上传</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
