const http = require("http")
const https = require("https")
const url = require("url")
const {fileURLToPath} = require("url")
const moduleRenderHTML = require("./module/renderHTML")

// 创建服务器对象
const server = http.createServer()

// 响应浏览器请求事件
server.on("request", (req, res) => {
  // const { pathname, query } = url.parse(req.url, true)
  
  const myURL = new URL(req.url, 'http://127.0.0.1:3001')
  const {pathname, searchParams} = new URL(req.url, 'http://127.0.0.1:3001')
  if (pathname === "/favicon.ico") return
  console.log(myURL, "myURL");
  // console.log(fileURLToPath, fileURLToPath('http://127.0.0.1:3001'));
  // console.log(searchParams.get('callback'), "myURL");

  // 向浏览器添加响应头 响应状态/内容
  res.writeHead(200, { 
    "Content-Type": "application/json;charset=utf-8",
    // cors头
    "access-control-allow-origin": "*",
  })
  // res.write(moduleRenderHTML.renderHTML(pathname))
  httpGet((data) => {
    res.end(data)
  })
  
})

// 监听对应端口号
server.listen(3001, () => {
  console.log('server OK');
})

function httpGet(response) {
  let data = ""
  https.get("https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=珠海&ci=108&channelId=4", (res) => {
    // 监听每一次数据的返回(数据流)
    res.on('data', (chunk) => {
      data += chunk
    })
    
    // 在这里拿到的是完整的数据
    res.on('end', () => {
      console.log(data);
      response(data)
    })
  })
}