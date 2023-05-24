const express = require("express")
const mysql2 = require("mysql2")

const app = express()

app.get('/', async (req, res) => {
  // 创建连接池，进行操作
  const config = getDBConfig()
  const promisePool = mysql2.createPool(config).promise()
  var users = await promisePool.query(`select * from ?? where name=? and gender=? order by score desc`, ['students', '王五', 1])
  console.log(users[0]);

  res.send({
    status: 1,
  })
})

app.get('/insert', async (req, res) => {
  // 创建连接池，进行操作
  const config = getDBConfig()
  const promisePool = mysql2.createPool(config).promise()
  var users = await promisePool.query(`insert into students(name, score, gender, class_id) values(?,?,?,?)`, ['童恩惜', 150, 0, 2])
  console.log(users[0]);

  res.send({
    status: 1,
  })
})

app.listen(3000)

function getDBConfig() {
  return {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'user_list',
    connectionLimit: 1,
  }
}