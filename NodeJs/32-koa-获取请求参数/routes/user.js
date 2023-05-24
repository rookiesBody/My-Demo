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

module.exports = router