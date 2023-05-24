const express = require("express");

const app = express() //创建服务器

app.get("/", (req, res) => {
  // res.send(`
  //   <html>
  //     <h1>how are you</h1>
  //   </html>
  // `)

  res.send({
    name: '张三',
    age: 18,
  })
})

app.get("/login", (req, res) => {
  res.send("login")
})

app.listen(3001, () => { //监听端口号
  console.log("server OK~~");
})