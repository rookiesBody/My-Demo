const Router = require("koa-router")
const router = new Router()
const listRouter = require("./list")
const userRouter = require("./user")
const homeRouter = require("./home")

// 统一加前缀
// router.prefix("/api")

// 注册路由级组件
router.use("/list", listRouter.routes(), listRouter.allowedMethods())
router.use("/user", userRouter.routes(), userRouter.allowedMethods())

router.use("/home", homeRouter.routes(), homeRouter.allowedMethods())

// 重定向
router.redirect("/", "/home")

module.exports = router;