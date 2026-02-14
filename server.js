const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const celebrityRoutes = require("./routes/celebrityRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

const allowedOrigins = [
  "https://vceleb.in",
  "https://www.vceleb.in",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow server-to-server, Postman, curl
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, false); // <-- IMPORTANT
  },
  credentials: true,
  optionsSuccessStatus: 200
}));


app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/celebrities", celebrityRoutes);
app.use("/api/bookings", bookingRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(process.env.PORT, () =>
  console.log("Backend running on port", process.env.PORT)
);
