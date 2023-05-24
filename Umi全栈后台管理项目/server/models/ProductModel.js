const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductType = {
  title: String,
  quickDesc: String, //简要描述
  detailDesc: String, //详细描述
  cover: String, //封面
  // isPublish: Number, //未发布，已发布
  editTime: Date, //发布时间
  uid: String,
}

// product模型 ==> products集合
const ProductModel = mongoose.model('product', new Schema(ProductType))

module.exports = ProductModel;