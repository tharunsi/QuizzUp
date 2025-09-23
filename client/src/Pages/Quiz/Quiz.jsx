import React, { useState } from "react";

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
      <div>
        <h2>Your Score: {score}/{questions.length}</h2>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h3>Q{current + 1}. {questions[current].question}</h3>
      <ul>
        {questions[current].options.map((opt, i) => (
          <li
            key={i}
            onClick={() => handleOptionClick(i)}
            style={{
              backgroundColor: selected === i ? "#ccefff" : "#f9f9f9",
              cursor: "pointer",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              margin: "8px 0"
            }}
          >
            {opt}
          </li>
        ))}
      </ul>
      <button onClick={handleNext} style={{ marginTop: "10px" }}>
        {current === questions.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
};

export default Quiz;
