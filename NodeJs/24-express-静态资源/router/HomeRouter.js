// 首页模块路由中间件
const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  res.send("home")
})

router.get("/search", (req, res) => {
  res.send("search")
})


module.exports = router;