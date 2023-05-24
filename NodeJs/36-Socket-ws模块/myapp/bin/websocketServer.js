const WebSocket = require("ws");
const JWT = require("../utils/JWT");
const WebSocketServer = WebSocket.WebSocketServer

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection (ws, req) {
  const myURL = new URL(req.url, "http://127.0.0.1:3000")
  //校验token
  const payload = JWT.verify(myURL.searchParams.get("token"))
  if (payload) {
    ws.send(createMessage(WebSocketType.GroupChat, null, "欢迎来到聊天室~"))

    // console.log('payload', payload); //当前登录的用户信息
    ws.user = payload

    //群发
    sendAll()
  } else {
    ws.send(createMessage(WebSocketType.Error, null, "请重新登录~"))
  }

  ws.on('error', console.error);
  //客户端发送内容接收回调
  ws.on('message', function message (data, isBinary) {
    const msgObj = JSON.parse(data)
    switch (msgObj.type) {
      case WebSocketType.GroupList:
        ws.send(createMessage(WebSocketType.GroupList, null, JSON.stringify(Array.from(wss.clients).map(item => item.user))))
        break;
      case WebSocketType.GroupChat:
        console.log(msgObj);
        // wss.clients 存储当前所有 连接到服务端的 客户端
        wss.clients.forEach(function each (client) {
          // 判断是否处于连接状态
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(createMessage(WebSocketType.GroupChat, ws.user, msgObj.data), { binary: isBinary });
          }
        });
        break;
      case WebSocketType.SingleChat:
        // wss.clients 存储当前所有 连接到服务端的 客户端
        wss.clients.forEach(function each (client) {
          console.log(client.user);
          // 判断是否处于连接状态
          if (client.user._id === msgObj.to && client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(createMessage(WebSocketType.SingleChat, ws.user, msgObj.data), { binary: isBinary });
          }
        });
        break;
    }


  });

  ws.on("close", () => {
    //退出后删除当前用户信息
    wss.clients.delete(ws.user)
    sendAll()
  })
});

const WebSocketType = {
  Error: 0, //错误
  GroupList: 1, //聊天列表
  GroupChat: 2, //群聊
  SingleChat: 3, //私聊 
}
function createMessage (type, user, data) {
  return JSON.stringify({
    type,
    user,
    data,
  })
}
// 向所有用户发送在线信息
function sendAll () {
  wss.clients.forEach(function each (client) {
    // 判断是否处于连接状态
    if (client.readyState === WebSocket.OPEN) {
      client.send(createMessage(WebSocketType.GroupList, null, JSON.stringify(Array.from(wss.clients).map(item => item.user))))
    }
  });
}