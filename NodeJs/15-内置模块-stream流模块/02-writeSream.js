const fs = require("fs")

// 可写流
const ws = fs.createWriteStream("./2.txt", "utf-8")

ws.write("111111")
ws.write("22222")
ws.write("333333333")

ws.end()