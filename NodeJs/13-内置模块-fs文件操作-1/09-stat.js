const fs = require('fs')

// 读取目录
fs.stat("./avatar", (err, data) => {
  if (!err) {
    console.log(data.isFile()); // false
    console.log(data.isDirectory()); // true
  }
})

fs.stat("./avatar/b.txt", (err, data) => {
  if (!err) {
    console.log(data.isFile()); // true
    console.log(data.isDirectory()); // false
  }
})
