// src/components/QueueManagement.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./QueueManagement.css";

const QueueManagement = () => {
  const [queue, setQueue] = useState([]);
  const [waitingTime, setWaitingTime] = useState(15); // Average wait time in minutes
  const [userPosition, setUserPosition] = useState(null);
  const [userPhone, setUserPhone] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:5000");
    
    // Fetch initial queue
    fetchQueue();
    
    // Real-time queue updates
    socket.on("queueUpdate", (updatedQueue) => {
      setQueue(updatedQueue);
      updateWaitingTime(updatedQueue);
    });

    socket.on("userNotified", (data) => {
      if (data.phone === userPhone) {
        alert(`🎉 Your table is ready! Please proceed to Table ${data.tableNumber}`);
        setUserPosition(null);
      }
    });

    return () => socket.disconnect();
  }, [userPhone]);

  const fetchQueue = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/queue");
      setQueue(res.data.queue);
      updateWaitingTime(res.data.queue);
    } catch (err) {
      console.error("Error fetching queue:", err);
    }
  };

  const updateWaitingTime = (queueData) => {
    const estimatedTime = queueData.length * 15; // 15 mins per group
    setWaitingTime(estimatedTime);
  };

  const joinQueue = async () => {
    if (!userPhone) {
      alert("Please enter your phone number to join the queue");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/queue/join", {
        phone: userPhone,
        groupSize: 2, // Default, can be made dynamic
        name: "Customer" // Can be input field
      });

      setUserPosition(res.data.position);
      alert(`✅ You're in queue! Position: ${res.data.position}`);
    } catch (err) {
      alert("Error joining queue: " + (err.response?.data?.message || err.message));
    }
  };

  const leaveQueue = async () => {
    try {
      await axios.post("http://localhost:5000/api/queue/leave", { phone: userPhone });
      setUserPosition(null);
      alert("You've left the queue");
    } catch (err) {
      console.error("Error leaving queue:", err);
    }
  };

  const preOrder = () => {
    // Redirect to menu with pre-order flag
    window.location.href = `/menu/pre-order?phone=${userPhone}`;
  };

  return (
    <div className="queue-management">
      <div className="queue-header">
        <h1>📋 Smart Queue Management</h1>
        <p>Real-time table availability tracking</p>
      </div>

      <div className="queue-stats">
        <div className="stat-card">
          <h3>Current Wait Time</h3>
          <div className="wait-time">{waitingTime} mins</div>
        </div>
        <div className="stat-card">
          <h3>Groups Ahead</h3>
          <div className="queue-length">{queue.length}</div>
        </div>
        <div className="stat-card">
          <h3>Your Position</h3>
          <div className="user-position">{userPosition || "Not in queue"}</div>
        </div>
      </div>

      {!userPosition ? (
        <div className="join-queue-section">
          <h3>Join Virtual Queue</h3>
          <div className="phone-input">
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
            <button onClick={joinQueue} className="join-btn">
              Join Queue
            </button>
          </div>
          <p className="queue-tip">
            💡 You'll receive a notification when your table is ready
          </p>
        </div>
      ) : (
        <div className="in-queue-section">
          <div className="queue-status">
            <h3>🎯 You're in Queue!</h3>
            <p>Position: <strong>#{userPosition}</strong></p>
            <p>Estimated wait: <strong>{waitingTime} minutes</strong></p>
          </div>

          <div className="queue-actions">
            <button onClick={preOrder} className="pre-order-btn">
              📱 Pre-Order Food
            </button>
            <button onClick={leaveQueue} className="leave-btn">
              🚪 Leave Queue
            </button>
          </div>

          <div className="waiting-tips">
            <h4>While You Wait:</h4>
            <ul>
              <li>✅ Pre-order your food to save time</li>
              <li>📍 Explore nearby attractions</li>
              <li>📞 Keep your phone handy for notifications</li>
            </ul>
          </div>
        </div>
      )}

      <div className="live-queue">
        <h3>Live Queue Status</h3>
        <div className="queue-list">
          {queue.map((customer, index) => (
            <div key={customer.phone} className={`queue-item ${index === 0 ? 'next-up' : ''}`}>
              <span className="position">#{index + 1}</span>
              <span className="customer-info">
                {customer.name} • {customer.groupSize} people
              </span>
              <span className="wait-time">
                ~{waitingTime - (index * 15)} mins
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QueueManagement;