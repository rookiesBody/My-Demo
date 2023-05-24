const { MongoClient } = require('mongodb');

async function handler (req, res) {
  const eventId = req.query.eventId;

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    // 服务端验证
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      // client.close();
      return;
    }

    const newComment = {
      eventId,
      email,
      name,
      text,
    };

    //初始化实例对象
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect(); //创建连接
    const db = client.db('events'); //创建\连接数据库
    const result = await db.collection('comments').insertOne(newComment); //创建\操作数据表(对象)

    console.log('result', result);
    client.close()

    res.status(201).json({ message: 'Add comment OK!', comment: newComment })
  }

  if (req.method === 'GET') {
    const dummyList = [
      { id: 'c1', name: '张三', text: '1111' },
      { id: 'c2', name: '李四', text: '2222' },
      { id: 'c3', name: '王五', text: '3333' },
    ]
    res.status(200).json({ message: 'ok!', comments: dummyList })
  }
};

export default handler;