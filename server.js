import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import celebrityRoutes from "./routes/celebrityRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173"
}));


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/celebrities", celebrityRoutes);

// 🔥 MongoDB connection (LOGS SUCCESS OR ERROR)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
  });

app.get("/", (req, res) => {
  res.send("VCeleb backend running");
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
