const EventsModel = require("../models/EventsModel.js")

const EventsService = {
  // add: async (data) => {
  //   return EventsModel.create(data) //新增操作
  // },
  add: async (data) => {
    return EventsModel.create(data) //新增操作
  },
  find: async (id) => {
    return EventsModel.find() //查询操作
  },
  // delete: async (id) => {
  //   return EventsModel.deleteOne({
  //     _id: id
  //   })
  // },
  // update: async (id, body) => {
  //   return EventsModel.updateOne( //updateOne如果有多项，只修改匹配到的第一项
  //     { _id: id }, //匹配对应项
  //     body, //修改内容
  //   )
  // },
}

module.exports = EventsService;