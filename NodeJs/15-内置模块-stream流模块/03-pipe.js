const fs = require("fs")

const readStream = fs.createReadStream("./1.txt")

const writeStream = fs.createWriteStream("./2.txt")

// 管道 高性能复制文件方法
// 读取1.txt文件的同时写入进2.txt文件
readStream.pipe(writeStream)