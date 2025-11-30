// src/components/Menu.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Menu.css";

function Menu() {
  const { tableNumber } = useParams();
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch menu items
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/menu");
        setMenu(res.data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
        alert("Failed to load menu. Please refresh the page.");
      }
    };

    fetchMenu();
  }, [tableNumber]);

  const addToCart = (item) => {
    if (item.stock <= 0) {
      alert("This item is out of stock!");
      return;
    }

    setCart(prevCart => {
      const currentQuantity = prevCart[item._id]?.quantity || 0;
      
      // Check if adding would exceed stock
      if (currentQuantity + 1 > item.stock) {
        alert(`Only Rs.{item.stock} ${item.name} available!`);
        return prevCart;
      }

      const quantity = currentQuantity + 1;
      return {
        ...prevCart,
        [item._id]: { 
          ...item, 
          quantity 
        }
      };
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[itemId];
      return newCart;
    });
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    const item = cart[itemId];
    if (newQuantity > item.stock) {
      alert(`Only Rs.{item.stock} ${item.name} available!`);
      return;
    }

    setCart(prevCart => ({
      ...prevCart,
      [itemId]: {
        ...prevCart[itemId],
        quantity: newQuantity
      }
    }));
  };

  // In your Menu.js - Update the placeOrder function with better error handling
const placeOrder = async () => {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Debug: Check what we're sending
  const orderItems = Object.values(cart)
    .filter(item => item && item._id && item.quantity > 0)
    .map(item => ({
      menuId: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

  console.log(" Cart items:", Object.values(cart));
  console.log(" Order items to send:", orderItems);
  console.log(" Table number:", tableNumber);

  if (!tableNumber || tableNumber === "undefined" || tableNumber === "null") {
    alert("Invalid table number. Please go back and select a table again.");
    return;
  }

  if (orderItems.length === 0) {
    alert("Cannot place order. Please add valid items to your cart.");
    return;
  }

  const totalAmount = Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);

  setIsLoading(true);

  try {
    const orderData = {
      tableNumber: parseInt(tableNumber),
      items: orderItems,
      totalAmount: totalAmount,
      status: "pending"
    };

    console.log(" Sending order data:", orderData);

    const response = await axios.post("http://localhost:5000/api/orders", orderData, {
      timeout: 10000, // 10 second timeout
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(" Order response:", response.data);

    if (response.data.success) {
      alert(" Order placed successfully!");
      setCart({});
    } else {
      // Handle backend-specific error messages
      const errorMsg = response.data.message || response.data.error || "Order failed";
      throw new Error(errorMsg);
    }

  } catch (err) {
    console.error(" Order submission failed:", err);
    
    // Detailed error analysis
    if (err.code === 'ECONNABORTED') {
      alert(" Request timeout - Server is taking too long to respond");
    } else if (err.response) {
      // Server responded with error status
      console.log(" Error response data:", err.response.data);
      console.log(" Error response status:", err.response.status);
      
      const serverError = err.response.data;
      let errorMessage = "Order failed. ";
      
      if (serverError.message) {
        errorMessage += serverError.message;
      } else if (serverError.error) {
        errorMessage += serverError.error;
      } else if (err.response.status === 400) {
        errorMessage += "Bad request - check order data";
      } else if (err.response.status === 500) {
        errorMessage += "Server error - please try again later";
      }
      
      alert(` ${errorMessage}`);
    } else if (err.request) {
      console.log("🌐 No response received:", err.request);
      alert(" Cannot connect to server. Please check:\n1. Backend server is running on port 5000\n2. No CORS issues\n3. Network connectivity");
    } else {
      alert(` ${err.message}`);
    }
  } finally {
    setIsLoading(false);
  }
};

  const totalAmount = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="menu-page-wrapper">
      <div className="menu-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Hotel Management System</h1>
            <p className="page-subtitle">Menu for Table {tableNumber}</p>
          </div>
          <div className="connection-status connected">
            <span className="status-dot"></span>
            Connected
          </div>
        </div>
        
        <div className="menu-grid">
          {menu.map((item) => (
            <div key={item._id} className="menu-card">
              <div className="item-image"></div>
              <div className="card-content">
                <div className="item-header">
                  <h3 className="item-name">{item.name}</h3>
                  <span className="item-price">Rs.{item.price}</span>
                </div>
                <div className="item-details">
                  <span className="item-time">Est. Time: {item.estimatedTime} mins</span>
                  <span className={`item-stock status-Rs.{item.stock > 10 ? 'high' : item.stock > 0 ? 'low' : 'out'}`}>
                    Stock: {item.stock} left
                  </span>
                </div>
                
                <div className="card-actions">
                  {item.stock > 0 ? (
                    <button 
                      className="add-button" 
                      onClick={() => addToCart(item)}
                      disabled={cart[item._id]?.quantity >= item.stock}
                    >
                      {cart[item._id]?.quantity >= item.stock ? 'Max Stock' : 'Add to Cart'}
                    </button>
                  ) : (
                    <button className="add-button disabled" disabled>Out of Stock</button>
                  )}
                  
                  {cart[item._id] && (
                    <div className="cart-controls">
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => updateCartQuantity(item._id, cart[item._id].quantity - 1)}
                        >
                          -
                        </button>
                        <span className="quantity-display">{cart[item._id].quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateCartQuantity(item._id, cart[item._id].quantity + 1)}
                          disabled={cart[item._id].quantity >= item.stock}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Sticky Cart Summary */}
      {Object.keys(cart).length > 0 && (
        <div className="sticky-cart-summary">
          <div className="cart-header">
            <h4>Your Order ({totalItems} items)</h4>
            <button 
              className="clear-cart-btn"
              onClick={() => setCart({})}
            >
              Clear All
            </button>
          </div>
          <div className="cart-content">
            <ul className="cart-list">
              {Object.values(cart).map(item => (
                <li key={item._id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">Rs.{item.price} each</div>
                  </div>
                  <div className="cart-item-controls">
                    <button 
                      className="cart-quantity-btn"
                      onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="cart-quantity">{item.quantity}</span>
                    <button 
                      className="cart-quantity-btn"
                      onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">Rs.{item.price * item.quantity}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="cart-footer">
            <div className="total-row">
              <span className="cart-total-label">Total:</span>
              <span className="cart-total-amount">Rs.{totalAmount}</span>
            </div>
            <button 
              onClick={placeOrder} 
              className="place-order-button"
              disabled={isLoading}
            >
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
