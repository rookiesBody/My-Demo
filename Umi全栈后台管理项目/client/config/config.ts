import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    {
      path: '/',
      component: '../layouts',
      routes: [
        {
          path: '/',
          component: 'home'
        },
        {
          path: '/home',
          component: 'home'
        },
        {
          path: '/center',
          component: 'center'
        },
        {
          path: '/manage',
          routes: [
            {
              path: '/manage/add',
              component: 'manage/userAdd'
            },
            {
              path: '/manage/list',
              component: 'manage/userList'
            },
          ]
        },
        {
          path: '/news',
          routes: [
            {
              path: '/news/create',
              component: 'news/createNews'
            },
            {
              path: '/news/list',
              component: 'news/newsList'
            },
          ]
        },
        {
          path: '/product',
          routes: [
            {
              path: '/product/add',
              component: 'product/addProduct'
            },
            {
              path: '/product/list',
              component: 'product/productList'
            },
          ]
        }
      ]
    },
    { path: '/login', component: './login' },
    { component: './404' },
  ],
  antd: {},
  proxy: {
    '/adminapi': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
    '/newsapi': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
    '/proapi': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
  dva: {},
});
