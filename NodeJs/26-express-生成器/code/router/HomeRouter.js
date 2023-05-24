// 首页模块路由中间件
const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  // res.send("home")
  const list = ['1111', '2222', '3333']
  const html = "<b>加粗内容</b>"
  res.render("home", {list:list, html:html})
})

router.get("/list", (req, res) => {
  res.send([111,222,333])
})

router.get("/search", (req, res) => {
  res.send("search")
})


module.exports = router;