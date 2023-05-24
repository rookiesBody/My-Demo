const fs = require('fs')

// 删除有文件的 目录结构

fs.readdir("./avatar", (err, data) => {
  if (!err) {
    data.forEach(item => {
      fs.unlinkSync(`./avatar/${item}`)
    });

    fs.rmdir("./avatar", (err) => {})
  }
})
