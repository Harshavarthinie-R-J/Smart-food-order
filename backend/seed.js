const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hotel", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Menu schema
const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  estimatedTime: Number
});

const Menu = mongoose.model("Menu", menuSchema);

// Your menu items
const menuItems = [
  { name: "Pizza", price: 250, stock: 10, estimatedTime: 15 },
  { name: "Burger", price: 150, stock: 20, estimatedTime: 10 },
  { name: "Pasta", price: 200, stock: 15, estimatedTime: 12 },
  { name: "French Fries", price: 100, stock: 25, estimatedTime: 8 },
  { name: "Coke", price: 50, stock: 30, estimatedTime: 2 },
  { name: "Pepsi", price: 50, stock: 30, estimatedTime: 2 },
  { name: "Salad", price: 120, stock: 15, estimatedTime: 5 },
  { name: "Ice Cream", price: 80, stock: 20, estimatedTime: 3 }
];

// Insert menu items
Menu.insertMany(menuItems)
  .then(() => {
    console.log("Menu seeded successfully");
    mongoose.disconnect();
  })
  .catch(err => console.log(err));
