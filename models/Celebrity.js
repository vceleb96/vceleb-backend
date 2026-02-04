const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number
});

module.exports = mongoose.model("Celebrity", celebritySchema);

