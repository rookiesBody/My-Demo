import React from 'react'
import { useRouter } from 'next/router'
 
export default function Slug() {
  const router = useRouter()
  console.log(router.query);  //{ slug: ['2012', 12] }

  return (
    <div>Slug</div>
  )
}
