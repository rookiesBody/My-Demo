const Koa = require("koa")
const static = require("koa-static")
const path = require("path")

const router = require("./routes")

const app = new Koa()

// 配置静态资源目录
app.use(static(path.join(__dirname, "public")))

// 应用级组件
app.use(router.routes()).use(router.allowedMethods()) //提示前端应该发起的正确请求方式

app.listen(3001)