import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  res.json({ token: "TEST_TOKEN" });
});

export default router;
