const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router()
//引入multer (负责解析文件类型数据)
const multer = require('multer')
const upload = multer({ dest: 'public/uploads/' })

/**
 * 
 * @api {post} /api/user/add 添加用户
 * @apiName addUser
 * @apiGroup usergroup
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} username 用户名
 * @apiParam  {String} password 密码
 * @apiParam  {Number} age 年龄
 * @apiParam  {File} avatar 头像
 * 
 * @apiSuccess (200) {Number} status 标识成功字段
 * 
 * @apiParamExample  {multipart/form-data} Request-Example:
 * {
 *     username : "zhangsan",
 *     password : "123456",
 *     age : 18,
 *     avatar : "File对象",
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     status : 1,
 * }
 * 
 * 
 */
router.post("/user/add", upload.single("avatar"), UserController.addUser)

/**
 * 
 * @api {post} /api/user/update/:id 更新用户
 * @apiName updateUser
 * @apiGroup usergroup
 * @apiVersion  1.0.0
 * 
 * 
 *  * @apiParam  {String} username 用户名
 * @apiParam  {String} password 密码
 * @apiParam  {Number} age 年龄
 * 
 * @apiSuccess (200) {Number} status 标识成功字段
 * 
 *  *  * @apiParamExample  {multipart/form-data} Request-Example:
 * {
 *     username : "zhangsan",
 *     password : "123456",
 *     age : 18,
 * }
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     status : 1,
 * }
 * 
 * 
 */
router.post('/user/update/:id',UserController.updateUser)

/**
 * 
 * @api {get} /api/user/delete/:id 删除用户
 * @apiName deleteUser
 * @apiGroup usergroup
 * @apiVersion  1.0.0
 * 
 * 
 * @apiSuccess (200) {Number} status 标识成功字段
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     status : 1,
 * }
 * 
 * 
 */
router.get('/user/delete/:id', UserController.deleteUser)

/**
 * 
 * @api {get} /api/user/list 获取用户列表
 * @apiName userList
 * @apiGroup usergroup
 * @apiVersion  1.0.0
 * 
 * 
 * @apiSuccess (200) {Number} status 标识成功字段
 * @apiSuccess (200) {Array} data 用户数组
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     status : 1,
 *     data: [{_id: "", username: "张三", age: 18, avatar: ""}]
 * }
 * 
 * 
 */
router.get('/user/list', UserController.getUser)

//登录校验
router.post('/login', UserController.login)

module.exports = router