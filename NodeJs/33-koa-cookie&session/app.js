const Koa = require("koa")
const static = require("koa-static")
const bodyParser = require("koa-bodyparser")
const path = require("path")
const views = require("koa-views")
const session = require("koa-session-minimal")

const router = require("./routes")

const app = new Koa()

// 配置静态资源目录
app.use(static(path.join(__dirname, "public")))
app.use(bodyParser()) //获取body

//配置模板引擎
app.use(views(path.join(__dirname, "views"), {extension: "ejs"}))

//session配置
app.use(session({
  key: "kerwinSessionId",
  cookie: {
    maxAge: 1000 * 60 * 60,
  }
}))

//session判断拦截
app.use(async (ctx, next) => {
  if (ctx.url.includes("login")) {
    await next()
    return 
  }
  if (ctx.session.user) {
    // 每次修改session属性都会重新计时
    ctx.session.date = Date.now()
    await next()
  } else {
    ctx.redirect("/login")
  }
})

// 应用级组件
app.use(router.routes()).use(router.allowedMethods()) //提示前端应该发起的正确请求方式

app.listen(3001)