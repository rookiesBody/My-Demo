var express = require('express');
var EventsController = require('../controllers/EventsController')
var EventsRouter = express.Router();

// 图片上传模块
const multer = require('multer')
const upload = multer({ dest: 'public/coverUploads/' })

/* GET Events listing. */
// EventsRouter.post('/events/add', upload.single('cover'), EventsController.add);
EventsRouter.post('/events/add', EventsController.add);
// EventsRouter.get('/events/find/:id', EventsController.find);
EventsRouter.get('/events/find', EventsController.find);
// EventsRouter.get('/events/delete/:id', EventsController.delete);
// EventsRouter.post('/events/update/:id', EventsController.update)


module.exports = EventsRouter;
