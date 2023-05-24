const fs = require("fs")

// 可读流
const rs = fs.createReadStream("./1.txt", "utf-8")

rs.on("data", (chunk) => {
  console.log(chunk);
})

rs.on("end", () => {
  console.log("end~~");
})

rs.on("error", (error) => {
  console.log(error);
})