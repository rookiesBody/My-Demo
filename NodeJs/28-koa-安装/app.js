const Koa = require("koa")

const app = new Koa()

// ctx===context上下文
app.use((ctx, next) => {
  ctx.response.body = {
    name: '张三',
    age: 18,
    status: 1,
  }
})

app.listen(3001)