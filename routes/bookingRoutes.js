const express = require("express");
const Booking = require("../models/Booking");
const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");
const sendEmail = require("../utils/email");

const router = express.Router();

/**
 * CREATE BOOKING (PUBLIC)
 * - Saves booking
 * - Emails admin
 */
router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create({
      name: req.body.name,
      email: req.body.email,
      celebrity: req.body.celebrity,
      message: req.body.message
    });

    // 📧 EMAIL ADMIN
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "New Booking Request - VCeleb",
      html: `
        <h3>New Booking Received</h3>
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Celebrity:</strong> ${booking.celebrity}</p>
        <p><strong>Message:</strong> ${booking.message}</p>
        <p><strong>Status:</strong> ${booking.status}</p>
      `
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking creation failed:", err);
    res.status(500).json({ message: "Booking failed" });
  }
});

/**
 * GET ALL BOOKINGS (ADMIN ONLY)
 */
router.get("/", auth, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("Fetch bookings failed:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

/**
 * UPDATE BOOKING STATUS (ADMIN ONLY)
 * - Updates status
 * - Emails customer
 */
router.put("/:id/status", auth, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 📧 EMAIL CUSTOMER
    await sendEmail({
      to: booking.email,
      subject: "Your Booking Status Updated - VCeleb",
      html: `
        <h3>Booking Status Updated</h3>
        <p><strong>Celebrity:</strong> ${booking.celebrity}</p>
        <p><strong>Status:</strong> ${booking.status}</p>
        <p>We will contact you shortly if further details are needed.</p>
      `
    });

    res.json(booking);
  } catch (err) {
    console.error("Status update failed:", err);
    res.status(500).json({ message: "Status update failed" });
  }
});

module.exports = router;
