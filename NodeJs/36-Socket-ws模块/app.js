const express = require("express")
const app = express()

app.use(express.static("./public"))

app.get("/", (req, res) => {
  res.send({
    status: 1
  })
})

app.listen(3000)

const WebSocket = require("ws")
const WebSocketServer = WebSocket.WebSocketServer

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection (ws) {
  ws.on('error', console.error);
  //客户端发送内容接收回调
  ws.on('message', function message (data, isBinary) {
    console.log('received: %s', data);
    // wss.clients 存储当前所有连接到服务端的客户端
    wss.clients.forEach(function each (client) {
      // 判断是否处于连接状态
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send('something...');
});