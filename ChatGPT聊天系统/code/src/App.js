import React, { useState } from 'react'
import axios from "axios";
import { Button, Input, Avatar, Tag } from 'antd'
import {
  SyncOutlined,
} from '@ant-design/icons';
import './App.css'

function App () {
  const [data, setData] = useState('')
  const [msg, setMsg] = useState('')

  const gptHandle = () => {
    axios.post(
      'http://localhost:3001',
      {
        message: msg
      },
      {
        // 服务端传入流式数据获取
        onDownloadProgress: ({ event }) => {
          const xhr = event.target
          const { responseText } = xhr
          // Always process the final line
          const lastIndex = responseText.lastIndexOf('\n', responseText.length - 2)
          let chunk = responseText
          if (lastIndex !== -1) 
            chunk = responseText.substring(lastIndex)
          try {
            const data = JSON.parse(chunk)
            console.log('data', data);
            setData(data.text)
          }
          catch (error) {
            //
            console.log(error);
          }
        },
      }
    )
  }

  return (
    <div style={{position: 'relative', height: '100vh'}}>
      <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle', fontWeight: 900, marginLeft: '80px', marginRight:'20px' }} size={70} gap={2}>
        GPT
      </Avatar>
      <Tag icon={<SyncOutlined spin />} color="processing" style={{minWidth: '50px', minHeight: '50px', fontSize: '18px', paddingTop: '15px', marginTop: '50px'}}>
        {data || '快来向我提问吧~'}
      </Tag>
      <div className="App" style={{display: 'flex', position: 'absolute', }}>
        <Input placeholder='请输入你要搜索的内容' onChange={(e) => setMsg(e.target.value)} style={{marginRight: '15px'}} />
        <Button onClick={() => gptHandle()}>点击</Button>
      </div>
    </div>

  );
}

export default App;
