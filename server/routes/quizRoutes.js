import express from "express";
import { getQuizByCategoryAndTopic, addQuiz,
  getQuizById } from "../controllers/quizController.js";

const router = express.Router();

router.get("/:category/:topic/headings", getQuizByCategoryAndTopic);
router.get("/byId/:id", getQuizById);
router.post("/", addQuiz);

export default router;
