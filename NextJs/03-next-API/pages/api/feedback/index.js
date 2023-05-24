import fs from 'fs';
import path from 'path';

export function buildFeedbackPath() {
  // process.cwd()读取整个目录的绝对路径，获取对应的文件路径
  return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  if (req.method === 'POST') {
    const {email, feedback} = JSON.parse(req.body)
    console.log(req.body);
    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedback,
    };

    // store that in a database or in a file
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'Success!', feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;