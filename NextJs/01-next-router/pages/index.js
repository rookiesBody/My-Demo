import React from 'react';
import Link from 'next/link';

 function Index() {
  return (
    <div>Index

      <div>
        <ul>
          <li>
            <Link href='/user'>To-User</Link>
          </li>
          <li>
            <Link href='/clent'>To-Clent</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Index;
