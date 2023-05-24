const express = require("express")

const app = express()

app.get("/login", (req, res) => {
  // 查询数据库
  // 返回内容
  res.send("登录接口~~")
})

app.use((req, res, next) => {
  // 验证用户token过期, cookie过期
  const isValid = true
  if (isValid) {
    res.isValid = "这是Token计算的结果~~"
    next()
  } else {
    res.send("token失效~~")
  }
})

// 指定路径的中间件
app.use("/home", (req, res, next) => {})

app.get("/home", (req, res) => {
  // 查询数据库
  // 返回内容
  console.log(res.isValid); //这是Token计算的结果~~
  res.send({ list: [1, 2, 3, 45, 6] })
})

app.use((err, req, res, next) => {
  console.log(err);
  res.send('报错了：' + err)
})

app.listen(3001, () => {
  console.log("server OK~");
})