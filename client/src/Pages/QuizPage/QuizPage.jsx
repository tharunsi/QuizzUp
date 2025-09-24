// src/pages/QuizPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuizById } from "../../api/quizApi"; // adjust path
import Quiz from "../Quiz/Quiz";
import "./QuizPage.css";


const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const res = await fetchQuizById(id);
        setQuiz(res.data);
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
    };
    loadQuiz();
  }, [id]);

  if (!quiz) return <p>Loading quiz...</p>;

  return (
    <div className="quiz-page">
      <h1>{quiz.heading}</h1>
      <div className="quizpage-container">
        <Quiz questions={quiz.questions} />
      </div>
    </div>
  );
};

export default QuizPage;
