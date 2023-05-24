const JWT = require('../utils/JWT');

function start (server) {
  const io = require('socket.io')(server)
  io.on('connection', (socket) => {
    console.log(111, socket.handshake.query.token);
    const payload = JWT.verify(socket.handshake.query.token)
    if (payload) {
      socket.user = payload
      //向客户端发出
      socket.emit("init", createMessage(null, "欢迎来到聊天室~"))

      sendAll(io) //登录成功后更新所有用户状态
    } else {
      socket.emit(WebSocketType.Error, createMessage(null, "token过期~"))
    }
    console.log();

    socket.on(WebSocketType.GroupList, (msgObj) => {
      console.log(Array.from(io.sockets.sockets).map(item => item[1].user));
    })
    socket.on(WebSocketType.GroupChat, (msgObj) => {
      //给所有人发
      io.sockets.emit(WebSocketType.GroupChat, createMessage(socket.user, msgObj.data))

      //除了自己不发，其他人发
      // socket.broadcast.emit(WebSocketType.GroupChat, createMessage(socket.user, msgObj.data))
    })
    socket.on(WebSocketType.SingleChat, (msgObj) => {
      Array.from(io.sockets.sockets).forEach(item => {
        if (item[1].user._id === msgObj.to) {
          item[1].emit(WebSocketType.SingleChat, createMessage(socket.user, msgObj.data))
        }
      })
    })

    //断连事件
    socket.on('disconnect', () => {
      sendAll(io)
    })
  })
}

const WebSocketType = {
  Error: 0, //错误
  GroupList: 1, //聊天列表
  GroupChat: 2, //群聊
  SingleChat: 3, //私聊 
}
function createMessage (user, data) {
  return {
    user,
    data,
  }
}
// 向所有用户发送在线信息
function sendAll (io) {
  io.sockets.emit(WebSocketType.GroupList, createMessage(null, Array.from(io.sockets.sockets).map(item => item[1].user).filter(item => item)))
}

module.exports = start