const express = require("express");
const Progress = require("../models/Progress");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * ADD PROGRESS
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { pullUps, pushUps, weightLifted } = req.body;

    const progress = await Progress.create({
      userId: req.userId,
      pullUps,
      pushUps,
      weightLifted
    });

    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Failed to add progress" });
  }
});

/**
 * GET USER PROGRESS HISTORY
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.userId })
      .sort({ date: 1 });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch progress" });
  }
});

module.exports = router;
