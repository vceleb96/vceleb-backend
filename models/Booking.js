const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    celebrity: String,
    message: String,
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
