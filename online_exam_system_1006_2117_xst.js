// 代码生成时间: 2025-10-06 21:17:52
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory database to store questions and answers
const questions = [];

// Test data for questions
const questionData = [
  {
    id: 1,
    text: 'What is the capital of France?',
    options: ['A. London', 'B. Paris', 'C. Berlin', 'D. Madrid'],
    answer: 'B. Paris'
  },
  // Add more questions here
];

// Initialize questions from test data
questionData.forEach(question => {
  questions.push(question);
});

// Endpoint to get all questions
app.get('/questions', (req, res) => {
  res.status(200).json(questions);
});

// Endpoint to submit answers
app.post('/submit', (req, res) => {
  const { answers } = req.body;
  
  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({
      error: 'Invalid answers provided'
    });
  }
  
  // Check answers
  const correctAnswers = Object.keys(answers).filter(
    id => answers[id] === questions[parseInt(id) - 1].answer
  ).length;
  
  res.status(200).json({
    totalQuestions: questions.length,
    correctAnswers,
    score: Math.floor((correctAnswers / questions.length) * 100)
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Online Exam System is running on http://localhost:${port}`);
});

// Comments and Documentation
// This script sets up an Express server to handle requests for questions and submission of answers.
// It uses an in-memory array to store questions and answers, which is not suitable for production but
// serves as a simple example for the online exam system.
// The '/questions' endpoint returns all questions to the client.
// The '/submit' endpoint accepts answers and calculates the score.
// Error handling is implemented for invalid requests.
// The system is designed to be easily extendable and maintainable, with clear code structure.
