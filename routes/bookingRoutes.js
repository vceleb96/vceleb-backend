const express = require("express");
const Booking = require("../models/Booking");
const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");

const router = express.Router();

// GET ALL BOOKINGS (ADMIN)
router.get("/", auth, adminOnly, async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// UPDATE STATUS (ADMIN)
router.put("/:id/status", auth, adminOnly, async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(booking);
});

module.exports = router;
