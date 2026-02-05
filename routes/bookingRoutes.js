const express = require("express");
const Booking = require("../models/Booking");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, celebrity } = req.body;

if (!name || !email || !celebrity) {
  return res.status(400).json({ message: "Missing required fields" });
}

  const booking = await Booking.create(req.body);
  res.json(booking);
});




router.get("/", auth, async (req, res) => {
  res.json(await Booking.find().sort({ createdAt: -1 }));
});

module.exports = router;
