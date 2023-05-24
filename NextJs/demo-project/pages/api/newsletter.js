import { MongoClient } from 'mongodb'

async function handler (req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: '邮件格式无效！' })
      return;
    }

    //初始化实例对象
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect(); //创建连接
    const db = client.db('events'); //创建\连接数据库
    await db.collection('newsletter').insertOne({ email: userEmail }); //创建\操作数据表(对象)
    client.close()

    res.status(201).json({ message: '邮件注册成功！' })
  }
}

export default handler;