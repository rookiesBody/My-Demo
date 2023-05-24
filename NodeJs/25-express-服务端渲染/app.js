/**
 * 路由中间件
 */ 
const express = require("express")
const LoginRouter = require("./router/LoginRouter")
const HomeRouter = require("./router/HomeRouter")

const app = express()

// 配置模板引擎
app.set("views", "/views") //配置模板存放路径
app.set("view enjine", "ejs")

// 配置静态资源
app.use(express.static("public"))

// 配置解析post参数的中间件-不需要下载第三方，内置
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// 应用级别中间件
app.use((req, res, next) => {
  console.log('token验证~');
  next()
})

// 挂载路由组件
app.use("/login", LoginRouter); 
app.use("/home", HomeRouter); 

// 错误中间件
app.use((err, req, res, next) => {
  // res.status(404).send("报错")
})

app.listen(3001, () => {
  console.log("server OK~");
})