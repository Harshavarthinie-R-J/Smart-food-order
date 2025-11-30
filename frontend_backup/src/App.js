// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SelectTable from "./components/SelectTable";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AboutUs from "./components/AboutUs";
import Help from "./components/Help";
import Feedback from "./components/Feedback";
import Menu from "./components/Menu"; // Add this for table selection
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<SelectTable />} />
          <Route path="/select-table" element={<SelectTable />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
          <Route path="/menu/:tableNumber" element={<Menu/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;