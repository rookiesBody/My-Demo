const http = require('http')

const server = http.createServer()

const Router = {}

//express use
function use(obj) {
  Object.assign(Router, obj)
}

function start() {
  server.on('request', (req, res) => {
    const myURL = new URL(req.url, "http://127.0.0.1")
    const { pathname } = myURL
    try {
      Router[pathname](req, res)
    } catch(err) {
      Router["/404"](req, res)
    }
  })
  
  server.listen(3001, () => {
    console.log('server OK~~');
  })
}

module.exports.start = start
module.exports.use = use