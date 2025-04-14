import React, { useState } from "react";
import "./Categories.css";

const categories = [
  {
    title: "Programming",
    icon: "💻",
    topics: ["C", "C++", "Java", "Python", "JavaScript"],
  },
  {
    title: "Aptitude",
    icon: "🧠",
    topics: ["Quantitative", "Problem Solving", "Speed Math"],
  },
  {
    title: "General Knowledge",
    icon: "🌍",
    topics: ["India", "World", "Current Affairs", "History"],
  },
  {
    title: "Logical Reasoning",
    icon: "🧩",
    topics: ["Puzzles", "Series", "Blood Relations", "Coding-Decoding"],
  },
  {
    title: "Physics",
    icon: "🔭",
    topics: ["Mechanics", "Waves", "Thermodynamics"],
  },
  {
    title: "Chemistry",
    icon: "⚗️",
    topics: ["Organic", "Inorganic", "Physical"],
  },
  {
    title: "Computer Networks",
    icon: "🌐",
    topics: ["TCP/IP", "OSI Model", "Routing", "Protocols"],
  },
  {
    title: "Verbal Ability",
    icon: "🗣️",
    topics: ["Synonyms", "Antonyms", "Reading Comprehension"],
  },
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
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`category-card-wrapper ${expanded === idx ? "active-card" : ""}`}
            onClick={() => toggleDropdown(idx)}
          >
            <div className="category-card-inner">
              <div className="category-header-box">
                <div className="category-icon-box">{cat.icon}</div>
                <div className="category-name-box">{cat.title}</div>
                <div className="category-arrow-box">{expanded === idx ? "▲" : "▼"}</div>
              </div>
            </div>

            <div
              className={`subcategory-box-wrapper ${
                expanded === idx ? "subcategory-box-open" : ""
              }`}
            >
              <ul className="subcategory-box-list">
                {cat.topics.map((topic, i) => (
                  <li key={i} className="subcategory-box-item">
                    {topic}
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
