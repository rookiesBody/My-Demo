const EventEmitter = require("events")

const event = new EventEmitter()

// 设置事件监听
event.on("play", (data) => {
  console.log('事件触发~~');
  console.log(data); // "23333"
})

// 触发定义的事件
event.emit("play", "23333")