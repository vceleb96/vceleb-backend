const express = require("express");
const Booking = require("../models/Booking");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json({ message: "Booking saved" });
});

router.get("/", auth, async (req, res) => {
  res.json(await Booking.find().sort({ createdAt: -1 }));
});

module.exports = router;
