const fs = require('fs')

// 读取 文件
// error-first
fs.readFile("./avatar/a.txt", "utf-8", (err, data) => {
  if (!err) {
    console.log(data);
  }
})
