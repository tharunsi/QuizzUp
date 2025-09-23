import Quiz from "../models/Quiz.js";

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
