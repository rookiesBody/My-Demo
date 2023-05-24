const express = require("express")
const app = express()

app.use((req, res, next) => {
  if(req.url === '/favicon.ico') return
  console.log('111');
  next()
  console.log('444');
  res.send("hello world")
})

app.use(async (req, res, next) => {
  console.log('222');

  //异步
  await delay(1000)
  console.log('333');
})

function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}

app.listen(3001)
