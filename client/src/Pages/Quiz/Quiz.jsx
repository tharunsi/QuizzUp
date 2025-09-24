import React, { useState } from "react";
import "./Quiz.css";

const Quiz = ({ questions }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [search, setSearch] = useState("");

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(search.toLowerCase())
  );

  const handleOptionClick = (i) => {
    setSelected(i);
  };

  const handleNext = () => {
    if (selected === filteredQuestions[current].answer) {
      setScore(score + 1);
    }

    setSelected(null);
    if (current < filteredQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <div className="quiz-container">
        <h2 className="score-text">Your Score: {score}/{filteredQuestions.length}</h2>
      </div>
    );
  }

  return (
    <div className="quiz-main">
      <div className="quiz-search-main">
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredQuestions.length === 0 ? (
        <p className="no-questions-main">No questions found.</p>
      ) : (
        <div className="quiz-container-main">
          <h3 className="question-text-main">
            Q{current + 1}. {filteredQuestions[current].question}
          </h3>
          <ul className="options-list-main">
            {filteredQuestions[current].options.map((opt, i) => (
              <li
                key={i}
                className={`option-item-main ${selected === i ? "selected" : ""}`}
                onClick={() => handleOptionClick(i)}
              >
                {opt}
              </li>
            ))}
          </ul>
          <button className="next-btn-main" onClick={handleNext}>
            {current === filteredQuestions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
