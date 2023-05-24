function renderHTML (url) {
  switch (url) {
    case "/home":
      return `
        <html>
          <b>okkkkk</b>
          <b>首页</b>
        </html>
      `
    case "/list":
      return `
        <html>
          <b>okkkkk</b>
          <b>列表页面</b>
        </html>
      `
    case "/api/home":
      return "[1, 2, 3]"
    case "/api/list":
      return '{name: "张三"}'
    default:
      return `
        <html>
          <b>okkkkk</b>
          <b>首页</b>
        </html>
      `
  }
}

module.exports = {
  renderHTML
}