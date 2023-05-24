const Router = require("koa-router")
const router = new Router()

router.get("/", async (ctx, next) => {
  /**
   * render() 为异步方法
   */
  console.log(ctx.cookies.get("name"));


  await ctx.render("home") //自动找到配置好的ejs模板
})

module.exports = router;