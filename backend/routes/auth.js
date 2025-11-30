const express = require("express");
const router = express.Router();

// Simple hardcoded admin login
const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ token: "admintoken123" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;