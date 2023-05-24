const server = require('./server')
const route = require('./route')  // 路由模块
const api = require('./api')  // 接口模块

// 注册路由
server.use(route)
server.use(api)

server.start()