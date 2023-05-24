const http = require("http")
const url = require("url")
const moduleRenderHTML = require("./module/renderHTML")

// 创建服务器对象
const server = http.createServer()

// 响应浏览器请求事件
server.on("request", (req, res) => {
  const { pathname, query } = url.parse(req.url, true)
  if (pathname === "/favicon.ico") return
  // req 接收浏览器传入参数
  // res 返回渲染的内容 /数据
  // res.write("hello world")
  // res.end('[1, 2, 3]')
  console.log(url.parse(req.url), true);
  console.log(query, "query");

  // 向浏览器添加响应头 响应状态/内容
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" })
  res.write(moduleRenderHTML.renderHTML(pathname))
  res.end()
})

// 监听对应端口号
server.listen(3001, () => {
  console.log('server OK');
})