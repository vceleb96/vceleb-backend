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

  // CREATE a celebrity (admin)
router.post("/", async (req, res) => {
  try {
    const celeb = new Celebrity(req.body);
    await celeb.save();
    res.status(201).json(celeb);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

  // DELETE a celebrity (admin)
router.delete("/:id", async (req, res) => {
  try {
    await Celebrity.findByIdAndDelete(req.params.id);
    res.json({ message: "Celebrity deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
