import { useState } from 'react'
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Row, Col, Avatar } from 'antd';
import {
  Form,
  Input,
  Button,
  Upload,
} from 'antd';
import { useSelector, useDispatch } from 'dva';
import request from '@/utils/request';

const { TextArea } = Input;

export default function Center() {
  const { userInfo } = useSelector((state: any) => state.user) || {};
  const dispatch = useDispatch()

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

    const formData = new FormData()
    for (let i in values) {
      formData.append(i, values[i])
    }

    try {
      const res = await request(`/adminapi/user/upload`, {
        method: 'POST',
        body: formData,
      })
      console.log(res);
      if (res.status === 1) {
        console.log('上传成功~');
        dispatch({
          type: 'user/getUserInfo',
          payload: res.data || {},
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
        <Breadcrumb.Item>个人中心</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col span={8}>
          <Card style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {
              userInfo.avatar ?
                <Avatar size={100} src={<img src={`http://localhost:3000${userInfo.avatar}`} alt="avatar" />} /> :
                <Avatar size={100} icon={<UserOutlined />} />
            }
            <div>
              <h2>{userInfo.username || '张三'}</h2>
              <div>{String(userInfo.role) === '1' ? '管理员' : '项目成员'}</div>
            </div>
          </Card>
        </Col>

        <Col span={16}>
          <Card title='个人信息'>
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
                <Input placeholder={userInfo.username || '张三'} />
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
                <Button type='primary' htmlType="submit">更新</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>

    </div>
  )
}
