const UserService = require('../../services/admin/UserService')
const JWT = require('../../utils/JWT')

const UserController = {
  login: async (req, res) => {
    console.log(req.body);
    // req.body
    const data = await UserService.login(req.body)

    if (data.length === 0) {
      res.send({
        status: 0,
        msg: '用户名或密码不正确'
      })
    } else {
      //设置token
      const token = JWT.generate({
        _id: data[0]._id,
        username: data[0].username,
      }, '1h')
      //token返回在header中
      res.header("Authorization", token)

      res.send({
        status: 1,
        msg: '登录成功',
        data: {
          id: data[0]._id,
          username: data[0].username,
          introduction: data[0].introduction, //简介
          avatar: data[0].avatar, //头像  
          role: data[0].role //管理员1，编辑2
        }
      })
    }
  },
  upload: async (req, res) => {
    // console.log(req.body, req.file);
    const { username, introduction } = req.body
    const avatar = `/avatarUploads/${req.file.filename}`

    const token = req.headers["authorization"]?.split(" ")[1]
    const payload = JWT.verify(token)
    try {
      await UserService.upload({ _id: payload._id, username, introduction, avatar })
      res.send({
        status: 1,
        msg: '更新用户信息成功~',
        data: {
          username,
          introduction,
          avatar,
        }
      })
    } catch (err) {
      res.send({ status: 0, msg: '更新用户信息失败~' })
    }
  },
  add: async (req, res) => {
    // console.log(req.body, req.file);
    const avatar = `/avatarUploads/${req.file.filename}`

    try {
      const data = await UserService.add({ ...req.body, avatar })
      console.log('data', data);
      res.send({
        status: 1,
        msg: '添加用户成功~',
      })
    } catch (err) {
      res.send({ status: 0, msg: '更新用户信息失败~' })
    }
  },
  find: async (req, res) => {
    const data = await UserService.find()
    if (data.length === 0) {
      res.send({ status: 0, msg: '查询用户列表失败~' })
    } else {
      res.send({
        status: 1,
        data,
      })
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params
    try {
      await UserService.deleteUser(id)
      res.send({
        status: 1,
        msg: '删除用户成功~',
      })
    } catch (err) {
      res.send({ status: 0, msg: '删除用户失败~' })
    }
  },
  updateUser: async (req, res) => {
    const { id } = req.params
    try {
      await UserService.updateUser(id, req.body)

      res.send({
        status: 1,
        msg: '更新用户成功~',
      })
    } catch (err) {
      res.send({ status: 0, msg: '更新用户失败~' })
    }

  },
}

module.exports = UserController