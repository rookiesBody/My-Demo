import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import {
  Card, Breadcrumb, Form,
  Input,
  Button,
  Upload,
} from 'antd'
import { useSelector } from 'dva';
import request from '@/utils/request';

const { TextArea } = Input

export default function CreateNews() {
  const { userInfo } = useSelector((state: any) => state.user) || {};

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
      values['cover'] = fileList[0].originFileObj
    }
    values['uid'] = userInfo.id || JSON.parse(localStorage.getItem("user") || '')?.id

    console.log(values);

    const formData = new FormData()
    for (let i in values) {
      formData.append(i, values[i])
    }

    try {
      const res = await request(`/proapi/product/add`, {
        method: 'POST',
        body: formData,
      })
      console.log(res);
      if (res.status === 1) {
        console.log('添加产品成功~');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTitle = (
    <Breadcrumb>
      <Breadcrumb.Item>产品管理</Breadcrumb.Item>
      <Breadcrumb.Item>添加产品</Breadcrumb.Item>
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
        >
          <Form.Item label="产品名称"
            name='title'
            rules={[{ required: true, message: '产品名称为必填项!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="商品简要描述"
            name='quickDesc'
            rules={[{ required: true, message: '商品简要描述为必填项!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="商品详细描述"
            name='detailDesc'
            rules={[{ required: true, message: '商品详细描述为必填项!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="产品图片" valuePropName="fileList"
            rules={[{ required: true, message: '产品图片为必填项!' }]}
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
            <Button type='primary' htmlType="submit">添加</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
