const express = require("express");
const Celebrity = require("../models/Celebrity");
const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");
const authOptional = require("../middleware/authOptional");

const router = express.Router();

/**
 * GET CELEBRITIES
 * - Public: NO price field
 * - Admin: full data
 */
router.get("/", authOptional, async (req, res) => {
  let celebs = await Celebrity.find().lean();

  // 👥 PUBLIC → strip price
  if (!req.user || !req.user.isAdmin) {
    celebs = celebs.map(({ price, ...rest }) => rest);
  }

  res.json(celebs);
});

/**
 * ADD CELEBRITY (ADMIN ONLY)
 */
router.post("/", auth, adminOnly, async (req, res) => {
  const celeb = new Celebrity(req.body);
  await celeb.save();
  res.json(celeb);
});

/**
 * UPDATE CELEBRITY (ADMIN ONLY)
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
 * DELETE CELEBRITY (ADMIN ONLY)
 */
router.delete("/:id", auth, adminOnly, async (req, res) => {
  await Celebrity.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
