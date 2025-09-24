import Quiz from "../models/Quiz.js";
import Leaderboard from "../models/Leaderboard.js";

export const getQuizByCategoryAndTopic = async (req, res) => {
  try {
    const { category, topic } = req.params;
    const quizzes = await Quiz.find({ category, topic }).select("heading");
    if (!quizzes || quizzes.length === 0) return res.status(404).json({ message: "Quiz not found" });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addQuiz = async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(201).json({ message: "Quiz saved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedQuiz) return res.status(404).json({ message: "Quiz not found" });
    res.json({ message: "Quiz updated", quiz: updatedQuiz });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (!deletedQuiz) return res.status(404).json({ message: "Quiz not found" });
    res.json({ message: "Quiz deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitQuizResult = async (req, res) => {
  try {
    const { id: quizId } = req.params; // quiz id from URL
    const { userId, score, timeTaken } = req.body; // user submits score

    const entry = new Leaderboard({ quizId, userId, score, timeTaken });
    await entry.save();

    res.status(201).json({ message: "Result submitted", entry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const { category, topic } = req.query; // fetch query params

    let filter = {};
    if (category) filter.category = category;
    if (topic) filter.topic = topic;

    const quizzes = await Quiz.find(filter).select("heading category topic"); 
    // select only necessary fields to reduce payload

    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
