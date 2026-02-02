import express from "express";
import Celebrity from "../models/Celebrity.js";

const router = express.Router();

// CREATE a celebrity (admin)
router.post("/", async (req, res) => {
  try {
    const celeb = new Celebrity(req.body);
    await celeb.save();
    res.status(201).json(celeb);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export default router;
