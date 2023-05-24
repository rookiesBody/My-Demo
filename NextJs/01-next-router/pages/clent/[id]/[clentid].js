import React from 'react'
import { useRouter } from 'next/router'

export default function ClentProject() {
  const router = useRouter()
  console.log(router.query);

  return (
    <div>ClentProject....</div>
  )
}
