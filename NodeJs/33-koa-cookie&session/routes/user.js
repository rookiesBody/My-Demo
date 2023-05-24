const Router = require("koa-router")
const router = new Router()

router.get("/", (ctx, next) => {
  console.log(ctx.query);
  ctx.body = ['user1', 'user2', 'user3']
})

router.post("/add", (ctx, next) => {
  console.log(ctx.request.body);

  ctx.body = {
    status: 1,
    message: "添加成功~"
  }
})

router.post("/login", (ctx, next) => {
  const {username, password} = ctx.request.body
  if(username === "zhangyi24" && password === "123"){
    ctx.session.user = {
      username: "zhangsan"
    }
    ctx.body = {
      status: 1,
      message: "登录成功~"
    }
  } else {
    ctx.body = {
      status: 0,
      message: "登录失败~"
    }
  }
})

module.exports = router