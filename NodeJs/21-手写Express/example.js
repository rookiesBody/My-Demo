// example.js
const express = require('./myExpress')
const app = express()
const port = 3001

app.use((req, res, next) => {
  console.log('第一次中间件~');
  next()
})

app.get('/login', (req, res) => {
  res.end('GET login!')
})

app.use((req, res, next) => {
  console.log('第二次中间件, 抛出错误~');
  next("报错le~")
})

app.post('/login', (req, res) => {
  res.end('POST login!')
})

app.all('*', (req, res) => {
  res.end('All~~')
})

app.use((err, req, res, next) => {
  console.log(err);
  next()
})

app.use((req, res, next) => {
  console.log("正常执行中间件~");
  next()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
