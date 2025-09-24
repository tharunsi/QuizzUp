import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  score: { type: Number, required: true },
  timeTaken: { type: Number, required: true },
  attemptedAt: { type: Date, default: Date.now },
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);
export default Leaderboard;
