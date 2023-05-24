var express = require('express');
var NewsController = require('../../controllers/admin/NewsController')
var NewsRouter = express.Router();

// 图片上传模块
const multer = require('multer')
const upload = multer({ dest: 'public/coverUploads/' })

/* GET Newss listing. */
NewsRouter.post('/news/add', upload.single('cover'), NewsController.add);
NewsRouter.get('/news/find/:id', NewsController.find);
NewsRouter.get('/news/delete/:id', NewsController.delete);
NewsRouter.post('/news/update/:id', NewsController.update)


module.exports = NewsRouter;
