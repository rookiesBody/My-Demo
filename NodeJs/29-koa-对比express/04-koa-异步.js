const Koa = require("koa")
const app = new Koa()

app.use(async (ctx, next) => {
  if(ctx.url === '/favicon.ico') return
  console.log('111')
  ;
  const mytoken = await next()
  console.log('mytoken', mytoken);
  
  console.log('444');
  ctx.body = 'hello world~'
})

app.use(async (ctx, next) => {
  console.log('222');
  await delay(1000)
  console.log('333');

  return 'asdzxc111111'
})

function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}

app.listen(3001)