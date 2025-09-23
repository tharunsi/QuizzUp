// src/pages/QuizPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuizById } from "../../api/quizApi"; // adjust path
import Quiz from "../Quiz/Quiz"; // if you already have a quiz component

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
    <div>
      <h1>{quiz.heading}</h1>
      <Quiz questions={quiz.questions} />
    </div>
  );
};

export default QuizPage;
