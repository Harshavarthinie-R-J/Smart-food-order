// backend/routes/feedback.js
const express = require("express");
const Feedback = require("../models/Feedback"); // You'll need to create this model
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;
    
    const newFeedback = new Feedback({
      name,
      email,
      rating: Number(rating),
      message
    });
    
    await newFeedback.save();
    
    res.json({
      success: true,
      message: "Feedback submitted successfully",
      feedback: newFeedback
    });
  } catch (err) {
    console.error("Feedback submission error:", err);
    res.status(500).json({
      success: false,
      error: "Failed to submit feedback"
    });
  }
});

module.exports = router;