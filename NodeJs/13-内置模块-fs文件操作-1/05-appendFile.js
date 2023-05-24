const fs = require('fs')

// 创建/写入追加 文件
fs.appendFile("./avatar/a.txt", "\n 爱你~~~", (err) => {
  console.log(err);
})
