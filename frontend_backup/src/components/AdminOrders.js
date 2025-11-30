// src/components/AdminOrders.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./AdminOrders.css";

const socket = io("http://localhost:5000");

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/orders");
      
      // Handle different response structures
      let ordersData = [];
      
      if (Array.isArray(res.data)) {
        // Case 1: Direct array response
        ordersData = res.data;
      } else if (res.data.orders && Array.isArray(res.data.orders)) {
        // Case 2: { orders: [] } structure
        ordersData = res.data.orders;
      } else if (res.data.success && Array.isArray(res.data.orders)) {
        // Case 3: { success: true, orders: [] } structure
        ordersData = res.data.orders;
      } else if (res.data.data && Array.isArray(res.data.data)) {
        // Case 4: { data: [] } structure
        ordersData = res.data.data;
      } else {
        console.warn("Unexpected API response structure:", res.data);
        ordersData = [];
      }
      
      console.log("Fetched orders:", ordersData); // Debug log
      setOrders(ordersData);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]); // Ensure orders is always an array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    socket.on("newOrder", (newOrder) => {
      console.log("New order received:", newOrder);
      setOrders(prev => [newOrder, ...prev]);
    });

    socket.on("updateOrder", (updatedOrder) => {
      console.log("Order updated:", updatedOrder);
      setOrders(prev => prev.map(o => o._id === updatedOrder._id ? updatedOrder : o));
    });

    socket.on("orderStatusUpdated", (updatedOrder) => {
      console.log("Order status updated:", updatedOrder);
      setOrders(prev => prev.map(o => o._id === updatedOrder._id ? updatedOrder : o));
    });

    return () => {
      socket.off("newOrder");
      socket.off("updateOrder");
      socket.off("orderStatusUpdated");
    };
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${id}`, { status });
      
      if (response.data.success) {
        // Update local state with the returned order
        setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
      } else {
        console.error("Failed to update order:", response.data);
        alert("Failed to update order status");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Error updating order status");
    }
  };

  // Safe rendering with proper fallbacks
  if (loading) {
    return (
      <div className="admin-orders-container">
        <h2>Live Orders Dashboard</h2>
        <div className="loading-message">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="admin-orders-container">
      <h2>Live Orders Dashboard</h2>
      <div className="orders-grid">
        {!Array.isArray(orders) || orders.length === 0 ? (
          <p className="no-orders-message">No new orders yet. Time for a break! ☕</p>
        ) : (
          orders.map(order => {
            // Safe access to order properties
            if (!order || typeof order !== 'object') {
              console.warn("Invalid order object:", order);
              return null;
            }

            return (
              <div 
                key={order._id || Math.random()} 
                className={`order-card status-${order.status || 'pending'}`}
              >
                <h4 className="table-header">Table {order.tableNumber || 'N/A'}</h4>
                <p className="status-badge">
                  Status: <strong>{(order.status || 'pending').toUpperCase()}</strong>
                </p>
                
                <ul className="order-items-list">
                  {Array.isArray(order.items) && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <li key={item._id || index}>
                        {item.quantity || 0} x {item.name || (item.menuId?.name || 'Unknown Item')}
                      </li>
                    ))
                  ) : (
                    <li>No items in this order</li>
                  )}
                </ul>
                
                <div className="order-footer">
                  <span className="order-total">
                    Total: ₹{order.totalAmount || 0}
                  </span>
                  <div className="order-actions">
                    {order.status === "pending" && (
                      <button 
                        onClick={() => updateStatus(order._id, "preparing")} 
                        className="action-in-progress"
                      >
                        Start Prep
                      </button>
                    )}
                    {order.status === "preparing" && (
                      <button 
                        onClick={() => updateStatus(order._id, "ready")} 
                        className="action-ready"
                      >
                        Mark Ready
                      </button>
                    )}
                    {order.status === "ready" && (
                      <button 
                        onClick={() => updateStatus(order._id, "completed")} 
                        className="action-completed"
                      >
                        Mark Done
                      </button>
                    )}
                    {(order.status === "pending" || order.status === "preparing") && (
                      <button 
                        onClick={() => updateStatus(order._id, "cancelled")} 
                        className="action-cancelled"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminOrders;