const express = require("express");
const Celebrity = require("../models/Celebrity");
const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");

const router = express.Router();

/**
 * GET ALL CELEBRITIES (PUBLIC)
 */
router.get("/", async (req, res) => {
  const celebs = await Celebrity.find();
  res.json(celebs);
});

/**
 * ADD CELEBRITY (ADMIN)
 */
router.post("/", auth, adminOnly, async (req, res) => {
  const celeb = new Celebrity(req.body);
  await celeb.save();
  res.json(celeb);
});

/**
 * UPDATE CELEBRITY (ADMIN)
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
 * DELETE CELEBRITY (ADMIN)
 */
router.delete("/:id", auth, adminOnly, async (req, res) => {
  await Celebrity.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
