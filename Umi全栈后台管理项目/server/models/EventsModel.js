const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Events = {
  eid: String,
  title: String, //标题
  description: String, //详细信息
  location: String, //地址
  date: String, //发布时间
  image: String, //事件图片
  isFeatured: String, //发布状态 1\2
}

// event模型 ==> events集合
const EventsModel = mongoose.model('event', new Schema(Events))

module.exports = EventsModel;