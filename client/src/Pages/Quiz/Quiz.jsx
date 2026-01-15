import React, { useState, useEffect } from "react";
import "./Quiz.css";

const Quiz = ({ questions, timeUp }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [search, setSearch] = useState("");
  const [attempted, setAttempted] = useState([]);


  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
  if (timeUp) {
    setShowScore(true);
  }
}, [timeUp]);

  const handleOptionClick = (i) => {
    if (timeUp) return;
    setSelected(i);
  };

  const handleNext = () => {
    if (selected !== null) {
    if (selected === filteredQuestions[current].answer) {
      setScore(score + 1);
    }

    setAttempted([...new Set([...attempted, current])]);
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
      <div className="question-nav">
  {filteredQuestions.map((_, index) => (
    <button
      key={index}  disabled={timeUp}
      className={`nav-btn 
        ${index === current ? "active" : ""}
        ${attempted.includes(index) ? "attempted" : ""}
      `}
      onClick={() => !timeUp && setCurrent(index)}
    >
      {index + 1}
    </button>
  ))}
</div>


      {filteredQuestions.length === 0 ? (
        <p className="no-questions-main">No questions found.</p>
      ) : (
        <div className="quiz-container-main">
          <div className="question-count">
  {current + 1} / {filteredQuestions.length}
</div>

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
          <button className="next-btn-main" onClick={handleNext} disabled={timeUp}>
            {current === filteredQuestions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
