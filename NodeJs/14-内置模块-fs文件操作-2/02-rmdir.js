const fs = require('fs').promises

// 删除有文件的 目录结构 promises
// fs.mkdir("./avatar2").then(data => {
//   console.log(data);
// })

fs.readdir("./avatar").then(async (data) => {
  const promiseList = data.map(item => {
    return fs.unlink(`./avatar/${item}`)
  });

  await Promise.all(promiseList)

  await fs.rmdir("./avatar")
})

