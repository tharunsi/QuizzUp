import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import QuizIllustration from "../../assets/quizphoto.png";

const Landing = () => {
  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Test Your Knowledge with Fun Quizzes 🎯</h1>
          <p className="hero-subtitle">
            Challenge yourself, track your progress, and learn in an engaging way.  
            Start exploring quizzes across categories today!
          </p>
          <Link to="/dashboard">
            <button className="hero-btn">Start Now</button>
          </Link>
        </div>
        <div className="hero-image">
          <img src={QuizIllustration} alt="Quiz illustration" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Our Quizzes?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>📚 Learn</h3>
            <p>Boost your knowledge with quizzes across multiple categories.</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Compete</h3>
            <p>Track your score, beat your records, and climb leaderboards.</p>
          </div>
          <div className="feature-card">
            <h3>🎨 Modern Design</h3>
            <p>Enjoy a clean, distraction-free, and responsive experience.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to Begin?</h2>
        <p>Join now and test your skills with fun quizzes!</p>
        <Link to="/signup">
          <button className="cta-btn">Get Started</button>
        </Link>
      </section>
    </div>
  );
};

export default Landing;
