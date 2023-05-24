const ProductModel = require("../../models/ProductModel")

const ProductService = {
  add: async (data) => {
    return ProductModel.create(data) //新增操作
  },
  find: async (id) => {
    return ProductModel.find({uid: id}) //查询操作
  },
  delete: async (id) => {
    return ProductModel.deleteOne({
      _id: id
    })
  },
  update: async (id, body) => {
    return ProductModel.updateOne( //updateOne如果有多项，只修改匹配到的第一项
      {_id: id}, //匹配对应项
      body, //修改内容
    )
  },
}

module.exports = ProductService