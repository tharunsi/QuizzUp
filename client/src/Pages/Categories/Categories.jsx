import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

const categoriesData = [
  {
    icon: "💻",
    title: "Programming",
    topics: ["C", "C++", "Java", "Python", "JavaScript"]
  },
  {
    icon: "🧠",
    title: "Aptitude",
    topics: ["Quantitative", "Problem Solving", "Speed Math"]
  },
  {
    icon: "🌍",
    title: "General Knowledge",
    topics: ["India", "World", "Current Affairs", "History"]
  },
  {
    icon: "🧩",
    title: "Logical Reasoning",
    topics: ["Puzzles", "Series", "Blood Relations", "Coding-Decoding"]
  },
  {
    icon: "🔭",
    title: "Physics",
    topics: ["Mechanics", "Waves", "Thermodynamics"]
  },
  {
    icon: "⚗️",
    title: "Chemistry",
    topics: ["Organic", "Inorganic", "Physical"]
  },
  {
    icon: "🌐",
    title: "Computer Networks",
    topics: ["TCP-IP", "OSI Model", "Routing", "Protocols"]
  },
  {
    icon: "🗣️",
    title: "Verbal Ability",
    topics: ["Synonyms", "Antonyms", "Reading Comprehension"]
  }
];

const Categories = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleDropdown = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="categories-container">
      <h1 className="categories-title">Explore Quiz Categories</h1>
      <div className="categories-grid">
        {categoriesData.map((cat, index) => (
          <div
            key={index}
            className={`category-card-wrapper ${expanded === index ? "active-card" : ""}`}
            onClick={() => toggleDropdown(index)}
          >
            <div className="category-card-inner">
              <div className="category-header-box">
                <div className="category-icon-box">{cat.icon}</div>
                <div className="category-name-box">{cat.title}</div>
                <div className="category-arrow-box">{expanded === index ? "▲" : "▼"}</div>
              </div>
            </div>
            <div className={`subcategory-box-wrapper ${expanded === index ? "subcategory-box-open" : ""}`}>
              <ul className="subcategory-box-list">
                {cat.topics.map((topic, i) => (
                  <li key={i} className="subcategory-box-item">
                    <Link to={`/quiz/${cat.title}/${topic}`} style={{ textDecoration: "none", color: "#333" }}>
                      {topic}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
