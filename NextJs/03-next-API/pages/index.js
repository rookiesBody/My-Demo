import React, { useRef, useState } from 'react'

function Index () {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailRef = useRef(null)
  const feedbackRef = useRef(null)

  const submitHandler = () => {

    console.log(emailRef.current.value, feedbackRef.current.value);
    const enteredEmail = emailRef.current.value
    const enteredFeedback = feedbackRef.current.value

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        feedback: enteredFeedback,
      }),
      headers: {
        'Content-Type': 'application-json',
      }
    })
      .then(response => response.json())
      .then(data => console.log(data));
  }

  const loadFeedbackHandler = () => {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
      });
  }

  return (
    <div>
      <div>
        <label htmlFor='email'>你的电子邮箱：</label>
        <input type='email' id='email' ref={emailRef} />
      </div>
      <div>
        <label htmlFor='feedback'>你的反馈：</label>
        <textarea id='feedback' rows='5' ref={feedbackRef} />
      </div>
      <button onClick={() => submitHandler()}>提交</button>
      <hr />
      <button onClick={() => loadFeedbackHandler()}>显示所有反馈内容</button>

      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default Index;
