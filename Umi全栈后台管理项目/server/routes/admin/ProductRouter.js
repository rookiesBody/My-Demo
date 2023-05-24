var express = require('express');
var ProductController = require('../../controllers/admin/ProductController')
var ProductRouter = express.Router();

// 图片上传模块
const multer = require('multer')
const upload = multer({ dest: 'public/imageUploads/' })

/* GET Newss listing. */
ProductRouter.post('/product/add', upload.single('cover'), ProductController.add);
ProductRouter.get('/product/find/:id', ProductController.find);
ProductRouter.get('/product/delete/:id', ProductController.delete);
ProductRouter.post('/product/update/:id', ProductController.update)

module.exports = ProductRouter;
