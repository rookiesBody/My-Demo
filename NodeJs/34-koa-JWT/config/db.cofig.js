/**
 * 连接数据库
 */
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/zz_koa")
// 插入集合和数据，数据库 zz_project 会自动创建