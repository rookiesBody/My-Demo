const jwt = require('jsonwebtoken')

// 密钥
const secret = 'zhangsan-anydata'

const JWT = {
  generate(data, expires) {
    return jwt.sign(data, secret, {expiresIn: expires})
  },
  verify(token) {
    try {
      return jwt.decode(token, secret)
    } catch (error) {
      return false
    }
  }
}

module.exports = JWT;