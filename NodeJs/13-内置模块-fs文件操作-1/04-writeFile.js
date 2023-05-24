const fs = require('fs')

// 创建/写入覆盖 文件
fs.writeFile("./avatar/a.txt", "你好 世界~~~", (err) => {
  console.log(err);
})
