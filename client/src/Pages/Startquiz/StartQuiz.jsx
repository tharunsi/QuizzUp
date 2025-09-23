import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Quiz from "../Quiz/Quiz";
import { fetchQuiz } from "../../api/quizApi"; 
import axios from "axios";

const StartQuiz = () => {
  const { category, topic } = useParams();
  const [quizzes, setQuizzes] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const res = await fetchQuiz(category, topic);
        setQuizzes(res.data);
      } catch (err) {
        console.error("Quiz fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
  }, [category, topic]);

  if (loading) return <div>Loading quiz...</div>;

  return (
    <div>
    <h2>{category} - {topic}</h2>
    {quizzes.length > 0 ? (
     <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <Link to={`/quiz/${category}/${topic}/${quiz._id}`}>
              {quiz.heading}
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <p>No quizzes found!</p>
    )}
  </div>
  );
};

export default StartQuiz;
