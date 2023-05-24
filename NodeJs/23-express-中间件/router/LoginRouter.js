// 登录模块路由中间件
const express = require("express")

const router = express.Router()

// 路由级别-响应前端的get请求
router.get("/", (req, res) => {
  console.log(req.query);
  res.send("login")
})

router.post("/", (req, res) => {
  console.log(req.body);
  res.send({
    status: 1,
    success: "登录成功~"
  })
})

// 路由级别-响应前端的post请求
router.post("/register", (req, res) => {
  console.log(req.body); //使用req.body 必须配置中间件
  res.send({
    status: 1,
    success: "注册成功~"
  })
})

module.exports = router;