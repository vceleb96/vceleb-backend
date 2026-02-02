import express from "express";
import Celebrity from "../models/Celebrity.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const celeb = await Celebrity.create(req.body);
  res.json(celeb);
});

router.get("/", async (req, res) => {
  const celebs = await Celebrity.find();
  res.json(celebs);
});

export default router;
