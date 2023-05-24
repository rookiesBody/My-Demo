const ProductService = require('../../services/admin/ProductService')

const ProductController = {
  add: async (req, res) => {
    // console.log(req.body, req.file);
    const cover = `/imageUploads/${req.file.filename}`

    try {
      const data = await ProductService.add({ ...req.body, cover, editTime: new Date() })
      console.log('data', data);
      res.send({
        status: 1,
        msg: '添加产品成功~',
      })
    } catch (err) {
      res.send({ status: 0, msg: '添加产品失败~' })
    }
  },
  find: async (req, res) => {
    const { id } = req.params

    try {
      const data = await ProductService.find(id)
      console.log('data==', data);

      if (data.length === 0) {
        res.send({
          status: 1,
          msg: '当前用户暂时未发布产品~',
          data: []
        })
      } else {
        res.send({
          status: 1,
          data,
        })
      }
    } catch (err) {
      res.send({ status: 0, msg: '查询产品列表失败~' })
    }
  },
  delete: async (req, res) => {
    const { id } = req.params
    try {
      await ProductService.delete(id)
      res.send({
        status: 1,
        msg: '删除产品成功~',
      })
    } catch (err) {
      res.send({ status: 0, msg: '删除产品失败~' })
    }
  },
  update: async (req, res) => {
    const { id } = req.params
    try {
      await ProductService.update(id, { ...req.body, editTime: new Date() })

      res.send({
        status: 1,
        msg: '更新产品信息成功~',
      })
    } catch (err) {
      res.send({ status: 0, msg: '更新产品信息失败~' })
    }

  },
}

module.exports = ProductController