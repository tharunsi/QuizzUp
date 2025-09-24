import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchQuiz } from "../../api/quizApi";
import "./StartQuiz.css";

const StartQuiz = () => {
  const { category, topic } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  const filteredQuizzes = quizzes.filter(q =>
    q.heading.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading">Loading quizzes...</div>;

  return (
    <div className="startquiz-container">
      <h2 className="startquiz-title">{category} - {topic}</h2>

      <div className="quiz-search">
        <input
          type="text"
          placeholder="Search quizzes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredQuizzes.length > 0 ? (
        <ul className="quiz-list">
          {filteredQuizzes.map((quiz) => (
            <li key={quiz._id} className="quiz-item">
              <Link to={`/quiz/${category}/${topic}/${quiz._id}`} className="quiz-link">
                {quiz.heading}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-quizzes">No quizzes found!</p>
      )}
    </div>
  );
};

export default StartQuiz;
