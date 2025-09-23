import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/quiz", quizRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(3000, () => console.log("Server running on port 3000")))
  .catch((err) => console.log(err));
