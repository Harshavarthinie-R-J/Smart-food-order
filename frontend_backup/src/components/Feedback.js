// src/components/Feedback.js
import React, { useState } from "react";
import "./Feedback.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "5",
    category: "food-quality",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your valuable feedback! We appreciate your input.");
    setFormData({
      name: "",
      email: "",
      rating: "5",
      category: "food-quality",
      message: ""
    });
  };

  return (
    <div className="feedback-container">
      <div className="feedback-form">
        <h1>Share Your Dining Experience</h1>
        <p className="feedback-subtitle">We value your opinion to help us improve</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Overall Rating *</label>
              <select 
                name="rating"
                value={formData.rating} 
                onChange={handleChange}
                className="rating-select"
                required
              >
                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                <option value="4">⭐⭐⭐⭐ Very Good</option>
                <option value="3">⭐⭐⭐ Good</option>
                <option value="2">⭐⭐ Fair</option>
                <option value="1">⭐ Poor</option>
              </select>
            </div>
            <div className="form-group">
              <label>Feedback Category *</label>
              <select 
                name="category"
                value={formData.category} 
                onChange={handleChange}
                required
              >
                <option value="food-quality">Food Quality</option>
                <option value="service">Service</option>
                <option value="ambiance">Ambiance</option>
                <option value="cleanliness">Cleanliness</option>
                <option value="value-for-money">Value for Money</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Your Feedback *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your dining experience, what you loved, and what we can improve..."
              rows="6"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;