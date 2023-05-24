const Router = require("koa-router")
const router = new Router()

router.get("/", (ctx, next) => {
  ctx.body = ['111', '222', '333']
})

router.post("/add", (ctx, next) => {
  ctx.body = {
    status: 1,
    message: "添加成功~"
  }
})

router.post("/update/:id", (ctx, next) => {
  console.log(ctx.params);
  ctx.body = {
    status: 1,
    message: "更新成功~"
  }
})

module.exports = router