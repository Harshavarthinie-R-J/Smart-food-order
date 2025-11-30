// backend/routes/order.js

const express = require("express");
const Order = require("../models/Order");
const Menu = require("../models/Menu");
const router = express.Router();

// Route to place a new order (Includes full stock check and validation)
router.post("/", async (req, res) => {
    const io = req.app.get('io');
    
    try {
        const { tableNumber, items } = req.body;
        
        // CRITICAL VALIDATION
        if (!tableNumber || items.length === 0) {
            return res.status(400).json({ error: "Table number and items are required." });
        }
        
        let totalAmount = 0;

        // STEP 1: Perform critical stock check for all items
        for (const item of items) {
            const menu = await Menu.findById(item.menuId);
            
            if (!menu || menu.stock < Number(item.quantity)) {
                return res.status(400).json({ error: `${menu ? menu.name : 'Item'} is out of stock. Cannot place order.` });
            }
            
            totalAmount += menu.price * Number(item.quantity);
        }
        
        // STEP 2: Create and save the new order
        const newOrder = new Order({ tableNumber, items, totalAmount });
        await newOrder.save();

        // STEP 3: Update stock in the database
        const updatedItems = [];
        for (const item of items) {
            const menu = await Menu.findByIdAndUpdate(
                item.menuId, 
                { $inc: { stock: -Number(item.quantity) } }, 
                { new: true }
            );
            updatedItems.push(menu);
        }
        
        // STEP 4: Notify clients
        if (io) {
            io.emit('stockUpdate', updatedItems); 
            io.emit('newOrder', newOrder);      
        }

        // Success response
        res.status(201).json({ message: "Order placed successfully!", order: newOrder });

    } catch (err) {
        console.error("Order processing failed due to server error:", err.message);
        res.status(500).json({ error: "Server failed to process order." });
    }
});

// Route to get all orders (for admin dashboard)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("items.menuId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
    const io = req.app.get('io');
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, 
            { status: status }, 
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found." });
        }
        
        if (io) io.emit('updateOrder', updatedOrder);
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;