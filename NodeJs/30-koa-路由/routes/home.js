const Router = require("koa-router")
const router = new Router()

router.get("/", (ctx, next) => {
  ctx.body = `
    <html>
      <body>
        <h1>Home~</h1>
      </body>
    </html>
  `
})

module.exports = router;