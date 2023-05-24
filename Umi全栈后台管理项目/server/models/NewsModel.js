const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsType = {
  title: String,
  content: String,
  category: String, //类别
  cover: String, //封面
  isPublish: Number, //未发布，已发布
  editTime: Date, //发布时间
  uid: String,
}

// user模型 ==> users集合
const NewsModel = mongoose.model('news', new Schema(NewsType))

module.exports = NewsModel;