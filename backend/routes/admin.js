// routes/admin.js

const express = require("express");
const Menu = require("../models/Menu");

const router = express.Router();

/* ------------------- ADMIN LOGIN ------------------- */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Hardcoded for now - change later to use DB
  if (username === "admin" && password === "admin") {
    return res.json({ success: true, message: "Login successful" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

/* ------------------- MENU MANAGEMENT ------------------- */

// ADD new menu item
router.post("/menu", async (req, res) => {
  try {
    const { name, price, stock, estimatedTime } = req.body;
    const newItem = new Menu({ name, price, stock, estimatedTime });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE menu item by ID
router.put("/menu/:id", async (req, res) => {
  try {
    const { name, price, stock, estimatedTime } = req.body;
    const updatedItem = await Menu.findByIdAndUpdate(
      req.params.id,
      { name, price, stock, estimatedTime },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE menu item by ID
router.delete("/menu/:id", async (req, res) => {
  try {
    const deletedItem = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
