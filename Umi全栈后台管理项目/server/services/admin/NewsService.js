const NewsModel = require("../../models/NewsModel")

const NewsService = {
  add: async (data) => {
    return NewsModel.create(data) //新增操作
  },
  find: async (id) => {
    return NewsModel.find({uid: id}) //查询操作
  },
  delete: async (id) => {
    return NewsModel.deleteOne({
      _id: id
    })
  },
  update: async (id, body) => {
    return NewsModel.updateOne( //updateOne如果有多项，只修改匹配到的第一项
      {_id: id}, //匹配对应项
      body, //修改内容
    )
  },
}

module.exports = NewsService