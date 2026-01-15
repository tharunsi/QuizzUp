import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  category: String,
  topic: String,
  heading: String,
  timePerQuestion: {
    type: Number, 
    required: true,
    default: 30
  },

  questions: [
    {
      question: String,
      options: [String],
      answer: Number,
    },
  ],
   proctoringEnabled: {
    type: Boolean,
    default: false,
  },
  shuffleQuestions: {
    type: Boolean,
    default: false,
  },

  shuffleOptions: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
