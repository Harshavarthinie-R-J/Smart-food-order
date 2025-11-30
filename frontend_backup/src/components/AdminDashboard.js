// src/components/AdminDashboard.js
import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import AdminOrders from "./AdminOrders";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h2>🏨 Admin Panel</h2>
        <nav className="admin-nav">
          <Link 
            to="/admin-dashboard/orders" 
            className={`nav-item ${location.pathname.includes('orders') ? 'active' : ''}`}
          >
            📋 Orders
          </Link>
          {/* Add more admin navigation links here */}
          <Link to="/" className="nav-item back-to-site">
            ← Back to Site
          </Link>
        </nav>
      </div>
      
      <div className="admin-content">
        <Routes>
          <Route path="orders" element={<AdminOrders />} />
          <Route path="/" element={<AdminOrders />} /> {/* Default to orders */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;