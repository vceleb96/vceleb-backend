import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas connection (SAFE & CLEAN)
mongoose
  .connect(
    "mongodb://vcelebuser:vEBS811@vceleb-shard-00-00.zq2jhcq.mongodb.net:27017,vceleb-shard-00-01.zq2jhcq.mongodb.net:27017,vceleb-shard-00-02.zq2jhcq.mongodb.net:27017/vceleb?ssl=true&replicaSet=atlas-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


// Test route
app.get("/", (req, res) => {
  res.send("VCeleb backend running");
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
