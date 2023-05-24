import React from 'react'
import { useRouter } from 'next/router'

export default function ClentIndex() {
  const router = useRouter()
  console.log(router.query);
  return (
    <div>clentIndex...</div>
  )
}
