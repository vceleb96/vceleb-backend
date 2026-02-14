const mongoose = require("mongoose");

const CelebritySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Bollywood",
        "TV",
        "Singer/Band",
        "Influencer",
        "Others"
      ]
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Celebrity", CelebritySchema);
