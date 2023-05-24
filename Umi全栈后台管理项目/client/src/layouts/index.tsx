import type { MenuProps } from "antd";
import { useSelector, useDispatch } from 'dva';
import { useLocation, history } from 'umi';
import { PieChartOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import request from '@/utils/request';
import Login from '../pages/login'

type MenuItem = Required<MenuProps>["items"][number];
const { Header, Content, Footer, Sider } = Layout;

const menuHash: any = {
  "/center": {
    label: "个人中心",
    icon: <UserOutlined />,
  },
  "/home": {
    label: "首页",
    icon: <PieChartOutlined />,
  },
  "/manage": {
    label: "用户管理",
    icon: <UserOutlined />,
  },
  "/manage/add": {
    label: "添加用户",
  },
  "/manage/list": {
    label: "用户列表",
  },
  "/news": {
    label: "新闻管理",
    icon: <UserOutlined />,
  },
  "/news/create": {
    label: "创建新闻",
  },
  "/news/list": {
    label: "新闻列表",
  },
  "/product": {
    label: "产品管理",
    icon: <PieChartOutlined />,
  },
  "/product/add": {
    label: "添加产品",
  },
  "/product/list": {
    label: "产品列表",
  },
};

// 白名单
const unaccessible = ["/", '/login'];

const getItem = (path: string, children?: MenuItem[]) => {
  const route = menuHash[path];
  return {
    key: path.startsWith("/") ? path : `/${path}`,
    icon: route?.icon || <></>,
    children,
    label: route?.label || path,
  } as MenuItem;
};

const routesToMenu = (routes: any[], role = "1"): MenuItem[] => {
  unaccessible.forEach((item, index) => {
    if (item === '/manage') unaccessible.splice(index, 1)
  })

  if (role !== '1') {
    unaccessible.push("/manage")
  }

  return routes
    .filter((i) => {
      const path = i.path.startsWith("/") ? i.path : `/${i.path}`;
      return !unaccessible.includes(path);
    })
    .map((route) => {
      const { path, routes } = route;
      if (routes) {
        return getItem(path, routesToMenu(routes));
      }
      return getItem(path);
    });
};


export default function Layouts(props) {
  console.log('route==', props.route.routes);
  // const dispatch = useDispatch()

  const { userInfo } = useSelector((state: any) => state.user) || {};

  const location = useLocation()

  if (location.pathname === '/login') {
    return <Login />;
  }
  console.log('role==', userInfo.role);

  const items = routesToMenu(props.route.routes, String(userInfo.role));

  console.log('items', items);

  const handleQuit = async () => {
    localStorage.removeItem('token')
    history.push('/login')
  }
  return (
    <Layout>
      <Sider width={256} style={{ minHeight: '100vh' }}>
        <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} />
        <Menu
          theme="dark"
          onClick={(e) => {
            history.push(e.key)
          }}
          defaultSelectedKeys={['/home']}
          // mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', textAlign: 'center', padding: 0, color: '#333' }}>
          <Button onClick={handleQuit}>退出</Button>
          <span>欢迎回来：{userInfo.username || '张三'}</span>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {props.children}
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Umi@3 实战小册 Created by xiaohuoni
        </Footer>
      </Layout>
    </Layout>
  );
}
