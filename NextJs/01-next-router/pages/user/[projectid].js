import React from 'react'
import { useRouter } from 'next/router'

export default function Project() {
  const router = useRouter()

  // console.log(router.pathname);
  console.log(router.query);
  // 根据 router.query.projectid 去后端获取对应 ID 的数据

  return (
    <div>Projectid</div>
  )
}
