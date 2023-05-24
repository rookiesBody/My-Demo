// 登录模块路由中间件
const express = require("express")

const router = express.Router()

// 路由级别-响应前端的get请求
router.get("/", (req, res) => {
  // console.log(req.query);
  // res.send("login") //片段&json
  // res.json([1,2,3]) //json

  // 渲染模板后返回给前端
  res.render("login", {error: '', isShow: false}) //自动找到views文件下的login.ejs
})

router.post('/', (req, res) => {
  if (req.body.username==="zhangsan" && req.body.password==="123456") {
    console.log("登录成功");
    // 重定向到 home
    res.redirect("home")
  } else {
    console.log("登录失败");
    res.render("login", {error: '用户名或密码不匹配', isShow: true}) //自动找到views文件下的login.ejs
  }
})

module.exports = router;