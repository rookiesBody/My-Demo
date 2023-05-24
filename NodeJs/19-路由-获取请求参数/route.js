const fs = require("fs")
const path = require('path')
const mime = require('mime')

function render (res, path, type = "") {
  res.writeHead(200, { "Content-Type": `${type ? type : "text/html"};charset=utf8` })
  res.write(fs.readFileSync(path), "utf-8")
  res.end()
}

const route = {
  "/login": (req, res) => {
    render(res, "./static/login.html")
  },
  "/home": (req, res) => {
    render(res, "./static/home.html")
  },
  "/": (req, res) => {
    render(res, "./static/home.html")
  },
  "/404": (req, res) => {
    // 如果是静态资源的情况
    if(readStaticFile(req, res)) {
      return
    }

    res.writeHead(404, { "Content-Type": "text/html;charset=utf8" })
    res.write(fs.readFileSync("./static/404.html"), "utf-8")
  },
}

// 判断是否为静态资源
function readStaticFile(req, res) {
  // 获取路径
  const myURL = new URL(req.url, "http://127.0.0.1:3001")
  const {pathname} = myURL

  // 拼接静态资源的绝对路径
  const staticPath = path.join(__dirname, "/static", pathname)

  // 判断当前文件是否存在
  if (fs.existsSync(staticPath)) {
    // 处理显示返回
    render(res, staticPath, mime.getType(pathname.split(".")[1]))
    return true
  } else {
    return false
  }
}

module.exports = route