/**
 * AES对称加密算法 - 加密解密都使用同一个秘钥
 */
const crypto = require("crypto")
// binary 二进制
// 加密
function encrypt(key, iv, data) {
  // 加密算法
  /*
    aes-128-cbc 指定加密算法
    key 加密的秘钥
    iv  可选，指定加密时所用的向量
   */
  let dep = crypto.createCipheriv("aes-128-cbc", key, iv)
  
  data = Buffer.from(data).toString('binary') // 防止中文乱码

  return dep.update(data, 'binary', 'hex') + dep.final('hex')
}

// 解密
function decrypt(key, iv, crypted) {
  Buffer.from(crypted, "hex").toString('binary')
  // 解密算法
  let dep = crypto.createDecipheriv("aes-128-cbc", key, iv)

  return dep.update(crypted, 'binary', 'utf8') + dep.final('utf8')
}
// 16 * 8 = 128
let key = "zhangyi123456789"
let iv = "zhang24123456789"

let data = "zhangyi"

let cryted = encrypt(key, iv, data)
console.log('加密结果：', cryted);

let decrypted = decrypt(key, iv, cryted)
console.log('解密结果：', decrypted);