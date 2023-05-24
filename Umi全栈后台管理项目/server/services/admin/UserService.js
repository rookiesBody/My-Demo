const UserModel = require("../../models/UserModel")

const UserService = {
  login: async (data) => {
    const {username, password} = data
    return UserModel.find({ //查询操作
      username,
      password
    })
  },
  upload: async (data) => {
    const {_id, username, introduction, avatar} = data
    return UserModel.updateOne({ //更新操作
      _id
    }, {
      username, introduction, avatar
    })
  },
  add: async (data) => {
    return UserModel.create(data) //新增操作
  },
  find: async () => {
    return UserModel.find() //查询操作
  },
  deleteUser: async (id) => {
    return UserModel.deleteOne({
      _id: id
    })
  },
  updateUser: async (id, body) => {
    return UserModel.updateOne( //updateOne如果有多项，只修改匹配到的第一项
      {_id: id}, //匹配对应项
      body, //修改内容
    )
  },
}

module.exports = UserService