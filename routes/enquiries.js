import express from "express";
import Enquiry from "../models/Enquiry.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const enquiry = await Enquiry.create(req.body);
  res.json({ success: true });
});

router.get("/", async (req, res) => {
  const enquiries = await Enquiry.find().sort({ createdAt: -1 });
  res.json(enquiries);
});

export default router;
