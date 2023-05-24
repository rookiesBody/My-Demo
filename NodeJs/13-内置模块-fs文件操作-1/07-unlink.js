const fs = require('fs')

// 删除文件
fs.unlink("./avatar/a.txt", (err) => {
  // console.log(err);
  if (err && err.code === "ENOENT") {
    console.log("文件不存在~~");
  } else {
    console.log("删除成功~~");
  }
})
