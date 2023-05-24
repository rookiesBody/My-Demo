var express = require('express');
var router = express.Router();

/* POST ChatGPT. */
router.post('/',async function(req, res, next) {
  const { ChatGPTAPI } = await import('chatgpt')
  res.header('Content-type', 'application/octet-stream')

  try {
    const { message } = req.body
    let firstChunk = true
    const api = new ChatGPTAPI({
      apiKey: process.env.OPENAI_API_KEY,
      completionParams: {
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        top_p: 0.8,
      }
    })
    const response = await api.sendMessage(message, {
      onProgress: (partialResponse) => {
        res.write(firstChunk ? JSON.stringify(partialResponse) : `\n${JSON.stringify(partialResponse)}`)
        firstChunk = false
        console.log(partialResponse.text);
      }
    })
    // const response = await api.sendMessage(message)
    console.log('res', response.text);

    return { type: 'Success', data: response }

  } catch (error) {
    res.write(JSON.stringify(error))

  } finally {
    res.send()
  }
});

module.exports = router;
