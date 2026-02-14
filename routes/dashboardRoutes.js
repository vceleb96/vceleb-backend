const express = require("express");
const Booking = require("../models/Booking");
const Celebrity = require("../models/Celebrity");
const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");

const router = express.Router();

router.get("/", auth, adminOnly, async (req, res) => {
  const celebCount = await Celebrity.countDocuments();
  const bookingCount = await Booking.countDocuments();

  res.json({
    celebrities: celebCount,
    bookings: bookingCount
  });
});

module.exports = router;
