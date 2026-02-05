const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const celebrityRoutes = require("./routes/celebrityRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors({ origin: "*" }));
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
