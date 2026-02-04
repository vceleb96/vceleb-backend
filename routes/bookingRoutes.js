const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

// 📩 Public: create booking
router.post("/", async (req, res) => {
  const { name, email, message, celebrity } = req.body;

  if (!name || !email || !celebrity) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const booking = new Booking({
    name,
    email,
    message,
    celebrity
  });

  await booking.save();
  res.json({ message: "Booking submitted" });
});

module.exports = router;
