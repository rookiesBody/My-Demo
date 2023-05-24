/**
 * mongo数据库 user集合模型
 */
const mongoose = require("mongoose")

const Schema = mongoose.Schema
// 限制集合字段类型
const UserType = {
  username: String,
  password: String,
  age: Number,
  avatar: String,
}

// 模型user 将会对应 users 集合(在数据库自动创建users集合)
const UserModel = mongoose.model("user", new Schema(UserType))

module.exports = UserModel