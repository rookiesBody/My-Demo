const fs = require('fs')

// 删除有文件的目录结构
fs.stat("./avatar", (err, data) => {
  if (!err) {
    console.log(data.isFile()); // false
    console.log(data.isDirectory()); // true
  }
})

fs.readdir("./avatar", (err, data) => {
  if (!err) {
    data.forEach(item => {
      fs.unlink(`./avatar/${item}`, (err) => {})
    });

    fs.rmdir("./avatar", (err) => {})
  }
})
