const http = require("http")
const fs = require("fs")
const zlib = require("zlib")
const gzip = zlib.createGzip()

// 创建服务器对象
const server = http.createServer()

server.on("request", (req, res) => {
  // res 可写流

  // 可读流
  const readStream = fs.createReadStream("./index.js", "utf-8")

  res.writeHead(200, { 
    "Content-Type": "application/x-javascript;charset=utf-8",
    "access-control-allow-origin": "*", //cors头
    "Content-Encoding": "gzip", //压缩格式
  })

  // 将可读流写入到可写流内 
  // (在写入之前再进行一次pipe写入，这次写入为了进行压缩)
  readStream.pipe(gzip).pipe(res)
})

server.listen(3001, () => {
  console.log("server is OK~~");
})