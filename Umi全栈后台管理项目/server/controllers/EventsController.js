const EventsService = require('../services/EventsService')

const EventsController = {
  // add: async (req, res) => {
  //   // console.log(req.body, req.file);
  //   const cover = `/coverUploads/${req.file.filename}`

  //   try {
  //     const data = await EventsService.add({ ...req.body, cover, isPublish: 1, editTime: new Date() })
  //     console.log('data', data);
  //     res.send({
  //       status: 1,
  //       msg: '添加新闻成功~',
  //     })
  //   } catch (err) {
  //     res.send({ status: 0, msg: '添加新闻失败~' })
  //   }
  // },
  add: async (req, res) => {
    // console.log(req.body, req.file);

    try {
      const data = await EventsService.add({ ...req.body })
      console.log('data', data);
      res.send({
        status: 1,
        msg: '添加事件成功~',
      })
    } catch (err) {
      res.send({ status: 0, msg: '添加新闻失败~' })
    }
  },

  // find: async (req, res) => {
  //   const { id } = req.params

  //   try {
  //     const data = await EventsService.find(id)
  //     console.log('data==', data);

  //     if (data.length === 0) {
  //       res.send({
  //         status: 1,
  //         msg: '当前用户暂时未发布新闻~',
  //         data: []
  //       })
  //     } else {
  //       res.send({
  //         status: 1,
  //         data,
  //       })
  //     }
  //   } catch (err) {
  //     res.send({ status: 0, msg: '查询新闻列表失败~' })
  //   }
  // },
  find: async (req, res) => {
    const data = await EventsService.find()
    if (data.length === 0) {
      res.send({ status: 0, msg: '查询事件列表失败~' })
    } else {
      res.send({
        status: 1,
        data,
      })
    }
  },
  // delete: async (req, res) => {
  //   const { id } = req.params
  //   try {
  //     await EventsService.delete(id)
  //     res.send({
  //       status: 1,
  //       msg: '删除新闻成功~',
  //     })
  //   } catch (err) {
  //     res.send({ status: 0, msg: '删除新闻失败~' })
  //   }
  // },
  // update: async (req, res) => {
  //   const { id } = req.params
  //   try {
  //     await EventsService.update(id, req.body.isPublish ? req.body : { ...req.body, editTime: new Date() })

  //     res.send({
  //       status: 1,
  //       msg: '更新新闻成功~',
  //     })
  //   } catch (err) {
  //     res.send({ status: 0, msg: '更新新闻失败~' })
  //   }

  // },
}

module.exports = EventsController