const Koa = require("koa")
const static = require("koa-static")
const bodyParser = require("koa-bodyparser")
const path = require("path")
const views = require("koa-views")
const session = require("koa-session-minimal")

const router = require("./routes")
const JWT = require("./utils/JWT")

const app = new Koa()

// 连接数据库
require("./config/db.cofig")

// 配置静态资源目录
app.use(static(path.join(__dirname, "public")))
app.use(bodyParser()) //获取body

//配置模板引擎
app.use(views(path.join(__dirname, "views"), { extension: "ejs" }))

//session配置
app.use(session({
  key: "kerwinSessionId",
  cookie: {
    maxAge: 1000 * 60 * 60,
  }
}))

//token判断拦截
app.use(async (ctx, next) => {
  if (ctx.url.includes("login")) {
    await next()
    return
  }

  const token = ctx.headers["authorization"]?.split(" ")[1]
  if (token) {
    const payload = JWT.verify(token)
    if (payload) {
      //重新计算过期时间
      const newToken = JWT.generate({
        _id: payload._id,
        username: payload.username,
      }, "1d")
      ctx.set("Authorization", newToken)

      await next()
    } else {
      //401
      ctx.status = 401
      ctx.body = { errCode: -1, errInfo: "token过期~" }
    }
  } else {
    await next()
  }
})

// 应用级组件
app.use(router.routes()).use(router.allowedMethods()) //提示前端应该发起的正确请求方式

app.listen(3001)