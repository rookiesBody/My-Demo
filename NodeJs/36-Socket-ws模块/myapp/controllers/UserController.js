/**
 * 在这个模块中只负责业务逻辑的代码
 */

const UserService = require("../service/UserService");
const JWT = require('../utils/JWT')

const UserController = {
  addUser: async (req, res) => {
    console.log(req.body);
    // 插入数据库
    // 1. 创建一个模型(user，限制filed类型),  一一对应数据库的集合(users)
    // 此模型代表一个集合，拥有操作集合的所有方法
    // user.create user.find user.delete user.update
    const { username, password, age } = req.body
    const avatar = req.file ? `/uploads/${req.file.filename}` : `/images/default.png`

    await UserService.addUser(username, password, age, avatar)

    res.send({
      status: 1,
      message: "注册成功~",
    })
  },
  updateUser: async (req, res) => {
    const { id } = req.params
    const { username, password, age } = req.body
    await UserService.updateUser(id, username, password, age)

    res.send({
      status: 1,
    })
  },
  deleteUser: async (req, res) => {
    const { id } = req.params
    await UserService.deleteUser(id)

    res.send({
      status: 1,
    })
  },
  getUser: async (req, res) => {
    const { page, limit } = req.query
    const data = await UserService.getUser(page, limit)

    res.send({
      status: 1,
      data,
    })
  },
  login: async (req, res) => {
    const { username, password } = req.body
    const data = await UserService.login(username, password)

    if (data.length === 0) {
      res.send({
        status: 0,
        message: '登录失败~'
      })
    } else {
      //设置token
      const token = JWT.generate({
        _id: data[0]._id,
        username: data[0].usrename,
      }, '1h')
      //token返回在header中
      res.header("Authorization", token)

      res.send({
        status: 1,
        message: '登录成功~'
      })
    }
  },
}

module.exports = UserController