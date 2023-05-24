import { useRef } from 'react';
import { history } from 'umi';
import { useDispatch } from 'dva';
import request from '@/utils/request';
// import request from "umi-request";

const Login = (props) => {
  const dispatch = useDispatch()
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const username = usernameRef.current.value || '';
    const password = passwordRef.current.value || '';

    try {
      const res = await request(`/adminapi/user/login`, {
        method: 'POST',
        data: {
          username,
          password
        }
      })
      console.log(res);
      if (res.status === 1) {
        console.log(res.data);
        dispatch({
          type: 'user/getUserInfo',
          payload: res.data || {},
        });
        localStorage.setItem('user', JSON.stringify(res.data || {}))
        history.push('/')
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '260px' }}>
      <h1>企业门户网站管理系统</h1>
      <form>
        <input ref={usernameRef} type='text' placeholder='请输入账号' /><br />
        <input ref={passwordRef} type='password' placeholder='请输入密码' /><br />
        <button onClick={handleSubmit} type='submit'>登录</button>
      </form>
    </div>
  );
}

export default Login;
