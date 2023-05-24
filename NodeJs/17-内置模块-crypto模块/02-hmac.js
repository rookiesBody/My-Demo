const crypto = require("crypto")

const hash = crypto.createHmac("md5", "zhangyi-key") // 哈希加密

hash.update("hello world") // 写入内容

console.log(hash.digest("hex")) // 16进制格式展示