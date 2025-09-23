import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  category: String,
  topic: String,
  heading: String,
  questions: [
    {
      question: String,
      options: [String],
      answer: Number,
    },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
