// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  tableNumber: Number,
  items: [
    {
      menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
      quantity: Number
    }
  ],
  totalAmount: Number,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);