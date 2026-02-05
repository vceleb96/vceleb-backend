const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  image: String
});

module.exports = mongoose.model("Celebrity", celebritySchema);
