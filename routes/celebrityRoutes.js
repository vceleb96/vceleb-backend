const express = require("express");
const Celebrity = require("../models/Celebrity");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await Celebrity.find());
});

router.post("/", auth, async (req, res) => {
  const celeb = new Celebrity(req.body);
  await celeb.save();
  res.json(celeb);
});

router.delete("/:id", auth, async (req, res) => {
  await Celebrity.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
