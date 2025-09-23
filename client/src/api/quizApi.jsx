import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/quiz",
});

export const fetchQuiz = (category, topic) =>
  API.get(`/${category}/${topic}/headings`);

export const createQuiz = (quizData) =>
  API.post("/", quizData);
export const fetchQuizById = (id) =>
  API.get(`/byId/${id}`);