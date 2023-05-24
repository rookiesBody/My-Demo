const Koa = require("koa")
const app = new Koa()

const router = require("./routes")

// 应用级组件
app.use(router.routes()).use(router.allowedMethods()) //提示前端应该发起的正确请求方式

app.listen(3001)