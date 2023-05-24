/**
 * 在这个模块中负责操作数据库
 */
const UserModel = require('../model/UserModel')

const UserService = {
  addUser: (username, password, age, avatar) => {
    return UserModel.create({
      username, password, age, avatar
    })
  },
  updateUser: (id, username, password, age) => {
    return UserModel.updateOne( //updateOne如果有多项，只修改匹配到的第一项
      {_id: id}, //匹配对应项
      {username, password, age}, //修改内容
    )
  },
  deleteUser: (id) => {
    return UserModel.deleteOne({
      _id: id
    })
  },
  getUser: (page, limit) => {
    // 添加分页查询功能
    return UserModel.find({}, ['username', 'age', 'avatar']).sort({age:-1}).skip((page-1)*limit).limit(limit)
  },
  login: (username, password) => {
    return UserModel.find({username,password})
  }
}

module.exports = UserService;