// src/components/AddMenuItem.js
import React, { useState } from "react";
import axios from "axios";

function AddMenuItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/menu", {
        name,
        price: Number(price),
        stock: Number(stock),
        estimatedTime: Number(estimatedTime),
      });
      alert("Item added successfully ✅");
      console.log(res.data);

      // Clear fields
      setName("");
      setPrice("");
      setStock("");
      setEstimatedTime("");
    } catch (err) {
      console.error(err);
      alert("Failed to add item ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Estimated Time (mins)"
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
          required
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default AddMenuItem;
