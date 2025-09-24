import React, { useState } from "react";
import "./Quiz.css";

const Quiz = ({ questions }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleOptionClick = (i) => {
    setSelected(i);
  };

  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }
    setSelected(null);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <div className="quiz-score">
        <h2>Your Score: {score}/{questions.length}</h2>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h3>Q{current + 1}. {questions[current].question}</h3>
      <ul className="quiz-options">
        {questions[current].options.map((opt, i) => (
          <li
            key={i}
            className={selected === i ? "selected" : ""}
            onClick={() => handleOptionClick(i)}
          >
            {opt}
          </li>
        ))}
      </ul>
      <button onClick={handleNext} className="quiz-btn">
        {current === questions.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
};

export default Quiz;
