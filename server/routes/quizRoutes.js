import express from "express";
import { getQuizByCategoryAndTopic, addQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  submitQuizResult,
getAllQuizzes } from "../controllers/quizController.js";

const router = express.Router();

router.get("/:category/:topic/headings", getQuizByCategoryAndTopic);
router.get("/byId/:id", getQuizById);
router.post("/", addQuiz);

router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);
router.post("/:id/submit", submitQuizResult);

router.get("/", getAllQuizzes);

export default router;
