// src/components/Help.js
import React from "react";
import "./Help.css";

const Help = () => {
  return (
    <div className="help-container">
      <div className="help-content">
        <h1>Restaurant Help & Support</h1>
        <div className="help-sections">
          <div className="help-section">
            <h3>📞 Contact Us</h3>
            <p><strong>Phone:</strong> +91-9876543210</p>
            <p><strong>Email:</strong> support@restaurant.com</p>
            <p><strong>Address:</strong> coimbatore</p>
          </div>
          <div className="help-section">
            <h3>🕒 Restaurant Hours</h3>
            <p><strong>Lunch:</strong> 11:00 AM - 3:00 PM</p>
            <p><strong>Dinner:</strong> 5:00 PM - 11:00 PM</p>
            <p><strong>Weekend Brunch:</strong> 10:00 AM - 2:00 PM</p>
          </div>
          <div className="help-section">
            <h3>🍽️ Dining Information</h3>
            <p><strong>Reservations:</strong> Recommended for weekends</p>
            <p><strong>Dress Code:</strong> Smart Casual</p>
            <p><strong>Special Diets:</strong> Vegetarian & Gluten-free options available</p>
          </div>
          <div className="help-section">
            <h3>❓ Frequently Asked Questions</h3>
            <p><strong>Q: Can I modify my order after placing it?</strong></p>
            <p>A: Orders can be modified within 5 minutes of placement.</p>
            <p><strong>Q: Do you offer takeaway?</strong></p>
            <p>A: Yes, we offer both dine-in and takeaway services.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;