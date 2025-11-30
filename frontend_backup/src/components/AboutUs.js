// src/components/AboutUs.js
import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1>About Our Restaurant</h1>
        <p>Welcome to our exquisite dining experience where flavor meets tradition.</p>
        <div className="features">
          <div className="feature-card">
            <h3>🍽️ Culinary Excellence</h3>
            <p>Experience gourmet cuisine crafted by our master chefs using the finest ingredients.</p>
          </div>
          <div className="feature-card">
            <h3>🌱 Fresh Ingredients</h3>
            <p>We source locally grown, organic produce to ensure the highest quality in every dish.</p>
          </div>
          <div className="feature-card">
            <h3>🎯 Exceptional Service</h3>
            <p>Our dedicated staff provides personalized service to make your dining experience memorable.</p>
          </div>
          <div className="feature-card">
            <h3>🏛️ Ambiance & Atmosphere</h3>
            <p>Enjoy your meal in our beautifully designed space perfect for any occasion.</p>
          </div>
          <div className="feature-card">
            <h3>👨‍🍳 Expert Chefs</h3>
            <p>Our culinary team brings years of experience and passion to every plate.</p>
          </div>
          <div className="feature-card">
            <h3>📱 Modern Technology</h3>
            <p>Seamless digital ordering system for your convenience and comfort.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;