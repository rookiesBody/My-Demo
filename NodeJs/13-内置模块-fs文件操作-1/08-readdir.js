const fs = require('fs')

// 读取目录
fs.readdir("./avatar", (err, data) => {
  // console.log(err);
  if (!err) {
    console.log(data); // [ 'a.txt', 'b.txt' ]
  }
})
