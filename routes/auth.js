import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const admin = await Admin.findOne(req.body);
  if (!admin) return res.status(401).json({ msg: "Invalid login" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;
