import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  // const client = await MongoClient.connect(
  //   'mongodb+srv://maximilian:8ZO3ycZqJ23kWBQx@cluster0.ntrwp.mongodb.net/events?retryWrites=true&w=majority'
  // );
  //初始化实例对象
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect(); //创建连接
  const db = client.db('newsletter'); //创建\连接数据库
  await db.collection('emails').insertOne({ email: userEmail }); //创建\操作数据表(对象)
  client.close()
  // return client;
}