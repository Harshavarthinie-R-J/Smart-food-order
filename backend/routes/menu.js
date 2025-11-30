// backend/routes/menu.js

const express = require("express");
const Menu = require("../models/Menu");
const router = express.Router();

// GET all menu items
router.get("/", async (req, res) => {
  try {
    const items = await Menu.find();
    console.log(`[MENU] Found ${items.length} items for the menu.`); // <-- ADD THIS LINE
    res.json(items);
  } catch (err) {
    console.error("[MENU ERROR] Failed to fetch items:", err); // <-- ADD THIS LINE
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;