const express = require("express");
const Celebrity = require("../models/Celebrity");
const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");

const router = express.Router();

router.post("/celebrities", auth, adminOnly, async (req, res) => {
  await Celebrity.deleteMany();

  const data = [
    {
      name: "Bollywood Star",
      category: "Bollywood",
      price: 500000,
      image: "https://via.placeholder.com/300"
    },
    {
      name: "TV Actor",
      category: "TV",
      price: 200000,
      image: "https://via.placeholder.com/300"
    },
    {
      name: "Rock Band",
      category: "Singer/Band",
      price: 300000,
      image: "https://via.placeholder.com/300"
    },
    {
      name: "Top Influencer",
      category: "Influencer",
      price: 150000,
      image: "https://via.placeholder.com/300"
    },
    {
      name: "Special Guest",
      category: "Others",
      price: 100000,
      image: "https://via.placeholder.com/300"
    }
  ];

  await Celebrity.insertMany(data);
  res.json({ message: "Seed data inserted" });
});

module.exports = router;
