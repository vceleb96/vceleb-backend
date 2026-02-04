const express = require("express");
const Celebrity = require("../models/Celebrity");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  const celebs = await Celebrity.find();
  res.json(celebs);
});

router.post("/", authMiddleware, async (req, res) => {
  const { name, category, price } = req.body;

  if (!name || !category || !price) {
    return res.status(400).json({ message: "All fields required" });
  }

  const celeb = new Celebrity({ name, category, price });
  await celeb.save();
  res.json(celeb);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Celebrity.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
