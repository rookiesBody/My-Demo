function UserProfilePage(props) {
  return <h1>{props.username}</h1>
}

export default UserProfilePage;

export async function getServerSideProps(context) {
  /**
   * params: 动态路由参数
   * req: 请求对象
   * res: 响应对象
   */
  const { params, req, res } = context;
  
  return {
    props: {
      username: 'Max'
    }
  };
}