import express from "express";
import Leaderboard from "../models/Leaderboard.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Save quiz result
router.post("/", auth, async (req, res) => {
  try {
    const { quizId, score, timeTaken } = req.body;
    const result = new Leaderboard({
      userId: req.user.id,
      quizId,
      score,
      timeTaken,
    });
    await result.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get leaderboard for a quiz
router.get("/:quizId", async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find({ quizId: req.params.quizId })
      .populate("userId", "name profilePicture")
      .sort({ score: -1, timeTaken: 1 })
      .limit(20);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
