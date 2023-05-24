const fs = require('fs')

// 删除目录
fs.rmdir("./avatar", (err) => {
  // console.log(err);
  if (err && err.code === "ENOENT") {
    console.log("目录不存在~~");
  } else if (err && err.code === "ENOTEMPTY") {
    console.log("该目录下已有文件~~");
  } else {
    console.log("删除成功~~");
  }
})
