import React, { useState } from "react";
import axios from "axios";
import './PostQuiz.css';

const PostQuiz = () => {
  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState("");
  const [heading, setHeading] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: 0 },
  ]);
  const [error, setError] = useState(null);

  // Handle changes in question fields
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  // Add a new question
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: 0 },
    ]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      category,
      topic,
      heading,
      questions,
    };

    try {
      // Send POST request to add quiz
      const response = await axios.post("http://localhost:3000/api/quiz", quizData);

      // Handle success
      alert(response.data.message); // Assuming the response contains a success message
      setCategory(""); // Reset category field
      setTopic(""); // Reset topic field
      setQuestions([{ question: "", options: ["", "", "", ""], answer: 0 }]); // Reset questions
    } catch (err) {
      // Handle error
      setError("Failed to post the quiz. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="post-quiz-container">
  <h1>Post a New Quiz</h1>
  {error && <p className="error-message">{error}</p>}
  <form onSubmit={handleSubmit}>
    <div>
      <label>Category:</label>
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
    </div>
    <div>
      <label>Topic:</label>
      <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} required />
    </div>
    <div>
      <label>Heading:</label>
      <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} required />
    </div>

    {questions.map((question, index) => (
      <div key={index} className="question-block">
        <div>
          <label>Question {index + 1}:</label>
          <input type="text" value={question.question} onChange={(e) => handleQuestionChange(index, "question", e.target.value)} required />
        </div>

        {question.options.map((option, optIndex) => (
          <div key={optIndex}>
            <label>Option {optIndex + 1}:</label>
            <input type="text" value={option} onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].options[optIndex] = e.target.value;
              setQuestions(newQuestions);
            }} required />
          </div>
        ))}

        <div>
          <label>Correct Answer (0-3):</label>
          <input type="number" value={question.answer} onChange={(e) => handleQuestionChange(index, "answer", parseInt(e.target.value))} min="0" max="3" required />
        </div>
      </div>
    ))}

    <button type="button" onClick={handleAddQuestion}>Add Question</button>
    <button type="submit">Submit Quiz</button>
  </form>
</div>
  );
};

export default PostQuiz;
