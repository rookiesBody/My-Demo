// 哈希字符 加密处理
const crypto = require("crypto")

const hash = crypto.createHash("md5") // 哈希加密

hash.update("hello world") // 写入内容
hash.update("bbbbb") // 写入内容

console.log(hash.digest("hex")) // 16进制格式展示