import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Leaderboard.css";

const Leaderboard = ({ quizId }) => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`/api/leaderboard/${quizId}`);
        console.log("Leaderboard API response:", res.data);

        // Normalize response → always array
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];

        setLeaders(data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err.response?.data || err.message);
        setLeaders([]);
      } finally {
        setLoading(false);
      }
    };

    if (quizId) fetchLeaderboard();
  }, [quizId]);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : leaders.length === 0 ? (
        <p>No results yet</p>
      ) : (
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
              <tr key={l._id || index}>
                <td>{index + 1}</td>
                <td>
                  {l.userId?.profilePicture && (
                    <img
                      src={l.userId.profilePicture}
                      alt="profile"
                      className="leader-pic"
                    />
                  )}
                  {l.userId?.name || "Unknown"}
                </td>
                <td>{l.score}</td>
                <td>{l.timeTaken}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
