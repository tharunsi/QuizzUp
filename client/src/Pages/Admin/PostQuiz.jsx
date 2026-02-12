import React, { useState } from "react";
import axios from "axios";
import './PostQuiz.css';

const categoriesData = [
  {
    title: "Programming",
    topics: ["C", "C++", "Java", "Python", "JavaScript"]
  },
  {
    title: "Aptitude",
    topics: ["Quantitative", "Problem Solving", "Speed Math"]
  },
  {
    title: "General Knowledge",
    topics: ["India", "World", "Current Affairs", "History"]
  },
  {
    title: "Logical Reasoning",
    topics: ["Puzzles", "Series", "Blood Relations", "Coding-Decoding"]
  },
  {
    title: "Physics",
    topics: ["Mechanics", "Waves", "Thermodynamics"]
  },
  {
    title: "Chemistry",
    topics: ["Organic", "Inorganic", "Physical"]
  },
  {
    title: "Computer Networks",
    topics: ["TCP-IP", "OSI Model", "Routing", "Protocols"]
  },
  {
    title: "Verbal Ability",
    topics: ["Synonyms", "Antonyms", "Reading Comprehension"]
  }
];



const PostQuiz = () => {
  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState("");
  const [heading, setHeading] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: 0 },
  ]);
  const [error, setError] = useState(null);
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [proctoringEnabled, setProctoringEnabled] = useState(false);
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [shuffleOptions, setShuffleOptions] = useState(false);
   
    const selectedCategory = categoriesData.find(
    (cat) => cat.title === category
  );

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
      timePerQuestion,
      questions,
      proctoringEnabled,
  shuffleQuestions,
  shuffleOptions,
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
                <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setTopic(""); // reset topic when category changes
            }}
            required
          >
            <option value="">Select Category</option>
            {categoriesData.map((cat) => (
              <option key={cat.title} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>

    </div>
    <div>
      <label>Topic:</label>
      <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            disabled={!category}
          >
            <option value="">Select Topic</option>
            {selectedCategory?.topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
    </div>
    <div>
      <label>Heading:</label>
      <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} required />
    </div>

    <div>
  <label>Time per Question (seconds):</label>
  <input
    type="number"
    min="5"
    value={timePerQuestion}
    onChange={(e) => setTimePerQuestion(Number(e.target.value))}
    required
  />
</div>


<div className="settings-section">
  <h3>Quiz Settings</h3>

  <label className="toggle">
    <input
      type="checkbox"
      checked={proctoringEnabled}
      onChange={(e) => setProctoringEnabled(e.target.checked)}
    />
    <span>Enable Proctoring</span>
  </label>

  <label className="toggle">
    <input
      type="checkbox"
      checked={shuffleQuestions}
      onChange={(e) => setShuffleQuestions(e.target.checked)}
    />
    <span>Shuffle Questions</span>
  </label>

  <label className="toggle">
    <input
      type="checkbox"
      checked={shuffleOptions}
      onChange={(e) => setShuffleOptions(e.target.checked)}
    />
    <span>Shuffle Options</span>
  </label>
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
  <label>Correct Answer</label>
  <select
    value={question.answer + 1} // we store 0-based index but show 1-4 to user
    onChange={(e) =>
      handleQuestionChange(index, "answer", parseInt(e.target.value) - 1)
    }
    required
  >
    <option value="">Select Correct Option</option>
    {question.options.map((opt, j) => (
      <option key={j} value={j + 1}>
        Option {j + 1}
      </option>
    ))}
  </select>
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
