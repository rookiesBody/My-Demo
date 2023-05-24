const Router = require("koa-router")
const router = new Router()
const userRouter = require("./user")
const homeRouter = require("./home")
const loginRouter = require("./login")
const uploadRouter = require("./upload")

// 统一加前缀
// router.prefix("/api")

// 注册路由级组件
router.use("/user", userRouter.routes(), userRouter.allowedMethods())

router.use("/login", loginRouter.routes(), loginRouter.allowedMethods())
router.use("/home", homeRouter.routes(), homeRouter.allowedMethods())
router.use("/upload", uploadRouter.routes(), uploadRouter.allowedMethods())

// 重定向
router.redirect("/", "/home")

module.exports = router;