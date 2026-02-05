const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
    celebrity: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
