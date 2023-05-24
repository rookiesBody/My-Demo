const express = require("express")

const app = express()

const verifyToken = (req, res, next) => {
  // 验证用户token过期, cookie过期
  const isValid = true
  if (isValid) {
    res.isValid = "这是Token计算的结果~~"
    next()
  } else {
    res.send("token失效~~")
  }
}

app.get("/home", [verifyToken], (req, res) => {
  // 查询数据库
  // 返回内容
  console.log(res.isValid); //这是Token计算的结果~~
  res.send({ list: [1, 2, 3, 45, 6] })
  // res,send({list: [1,2,3,45,6]})
})

app.use((err, req, res, next) => {
  console.log(err);
  res.send('报错了：' + err)
})

// // 匹配路由时 b 可有可无
// app.get("/ab?cd", (req, res) => {
//   res.send("ab?cd~")
// })

// // 匹配路由时 格式为 /ab/123
// app.get("/ab/:id", (req, res) => {
//   res.send("/ab/:id~")
// })

// // 匹配路由时 b 可以重复 n 次
// app.get("/ab+cd", (req, res) => {
//   res.send("/ab+cd~")
// })

// // 匹配 abcd、abxcd、abASDSAcd、ab12312cd 等
// app.get("/ab*cd", (req, res) => {
//   res.send("/ab*cd~")
// })

// // 正则匹配方式，以任意字符开头 fly结尾
// app.get(/.*fly$/, (req, res) => {
//   res.send("/ab*cd~")
// })

app.listen(3001, () => {
  console.log("server OK~");
})