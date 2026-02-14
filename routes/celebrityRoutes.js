const express = require("express");
const Celebrity = require("../models/Celebrity");
const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");

const router = express.Router();

/**
 * Public – anyone can view celebrities
 */
router.get("/", async (req, res) => {
  const celebs = await Celebrity.find();
  res.json(celebs);
});

/**
 * Admin only – create celebrity
 */
router.post("/", auth, adminOnly, async (req, res) => {
  const celeb = new Celebrity(req.body);
  await celeb.save();
  res.json(celeb);
});

/**
 * Admin only – update celebrity
 */
router.put("/:id", auth, adminOnly, async (req, res) => {
  const updated = await Celebrity.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/**
 * Admin only – delete celebrity
 */
router.delete("/:id", auth, adminOnly, async (req, res) => {
  await Celebrity.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
