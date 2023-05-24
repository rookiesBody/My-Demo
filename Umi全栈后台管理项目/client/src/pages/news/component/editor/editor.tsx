import React from 'react'
import E from 'wangeditor'
import { useMount } from 'ahooks'

interface editorType {
  getHTMLHandle: any,
  content: string,
}

export default function Editor(props: editorType) {
  const { getHTMLHandle, content } = props
  useMount(() => {
    const editor = new E('#editor')
    editor.create()

    content && editor.txt.html(content)

    editor.config.onchange = (newHtml: any) => {
      // console.log(newHtml);
      debounce(getHTMLHandle, 2000, newHtml)
    }
  })

  return (
    <div id='editor'></div>
  )
}
let timer: any = null;

function debounce(func, delay, html) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    func(html);
  }, delay);
}
