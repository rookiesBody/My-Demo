/**
 * 路由中间件
 */ 
const express = require("express")
const IndexRouter = require("./router/indexRouter")
const LoginRouter = require("./router/LoginRouter")
const HomeRouter = require("./router/HomeRouter")

const app = express()

// 配置解析post参数的中间件-不需要下载第三方，内置
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// 应用级别中间件
app.use((req, res, next) => {
  console.log('token验证~');
  next()
})

// 应用级别中间件
// app.use("/", IndexRouter); // 匹配路径 /login
// app.use("/api", IndexRouter); // 匹配路径 /api/login

// 挂载路由组件
app.use("/login", LoginRouter); 
app.use("/home", HomeRouter); 

// 错误中间件
app.use((err, req, res, next) => {
  res.status(404).send("报错")
})

app.listen(3001, () => {
  console.log("server OK~");
})