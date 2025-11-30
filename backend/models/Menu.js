// models/Menu.js
const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  estimatedTime: { type: Number, required: true }
});

module.exports = mongoose.model("Menu", menuSchema);