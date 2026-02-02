import express from "express";
import Celebrity from "../models/Celebrity.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const celebs = await Celebrity.find();
    res.json(celebs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
