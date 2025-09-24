import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Leaderboard.css";

const Leaderboard = ({ quizId }) => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`/api/leaderboard/${quizId}`);
        setLeaders(res.data);
      } catch (err) {
        console.error("Error fetching leaderboard", err);
      }
    };
    fetchLeaderboard();
  }, [quizId]);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Time Taken</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((l, index) => (
            <tr key={l._id}>
              <td>{index + 1}</td>
              <td>
                {l.userId.profilePicture && (
                  <img src={l.userId.profilePicture} alt="profile" className="leader-pic" />
                )}
                {l.userId.name}
              </td>
              <td>{l.score}</td>
              <td>{l.timeTaken}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
