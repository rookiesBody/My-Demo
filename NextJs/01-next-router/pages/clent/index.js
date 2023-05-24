import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Clent () {
  const router = useRouter()

  const clents = [
    { id: 'zs', name: '张三' },
    { id: 'ls', name: '李四' },
  ]

  const toLinkHandle = () => {
    router.push('/clent/max/proejcta')
  }

  return (
    <div>Clent
      <div>
        <ul>
          {
            clents.map(clent => <li key={clent.id}>
              <Link href={`/clent/${clent.id}`}>{clent.name}</Link>
            </li>)
          }
        </ul>

        <button onClick={() => toLinkHandle()}>点击跳转</button>
      </div>
    </div>
  )
}
