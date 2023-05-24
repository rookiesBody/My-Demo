const http = require("http")

// 创建服务器

http.createServer((req, res) => {
  // req 接收浏览器传入参数
  // res 返回渲染的内容 /数据
  // res.write("hello world")
  // res.end('[1, 2, 3]')

  // 向浏览器添加响应头 响应状态/内容
  res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"})
  res.write(`
    <html>
      <b>okkkkk</b>
      <b>我是云南的</b>
    </html>
  `)
}).listen(3001, () => {
  console.log('server OK');
})