const Router = require("koa-router");
const JWT = require("../utils/JWT");
const router = new Router()

const multer = require("@koa/multer");
const UserModel = require("../model/UserModel");
const upload = multer({dest: "public/uploads"})

router.get("/list", (ctx, next) => {
  ctx.body = {
    status: 1,
    data: [
      {
        _id: 1,
        username: "zhangsan",
        age: 18,
      },
      {
        _id: 2,
        username: "李四",
        age: 20,
      },
      {
        _id: 3,
        username: "王五",
        age: 22,
      },
    ]
  }
})

router.post("/login", (ctx, next) => {
  const {username, password} = ctx.request.body
  if(username === "zhangyi24" && password === "123"){
    //设置header
    const token = JWT.generate({
      _id: "233",
      username: "zhangsan"
    }, "1d")
    ctx.set("Authorization", token)

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

router.post("/upload", upload.single("avatar"), async (ctx) => {
  const {username, password, age} = ctx.request.body
  console.log(username, ctx.file.filename);
  const avatar = ctx.file ? `/uploads/${ctx.file.filename}` : ``

  await UserModel.create({
    username,
    password,
    age,
    avatar,
  })
  ctx.body = {status: 1}
})

module.exports = router