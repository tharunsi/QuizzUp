import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/leaderboard",
});

// Get leaderboard for a quiz
export const fetchLeaderboard = (quizId) => API.get(`/${quizId}`);

// Optional: post/update score for a quiz (requires JWT)
export const postScore = (quizId, score, token) =>
  API.post(
    `/${quizId}`,
    { score },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
