var express = require('express');
var UserController = require('../../controllers/admin/UserController')
var UserRouter = express.Router();

// 图片上传模块
const multer = require('multer')
const upload = multer({ dest: 'public/avatarUploads/' })

/* GET users listing. */
UserRouter.post('/user/login', UserController.login);
UserRouter.post('/user/upload', upload.single('avatar'), UserController.upload);
UserRouter.post('/user/add', upload.single('avatar'), UserController.add);
UserRouter.get('/user/find', UserController.find);
UserRouter.get('/user/delete/:id', UserController.deleteUser);
UserRouter.post('/user/update/:id', UserController.updateUser)


UserRouter.get('/user/demo', (req, res) => {
  console.log(req.aaa);
  res.send("测试接口~")
});

module.exports = UserRouter;
