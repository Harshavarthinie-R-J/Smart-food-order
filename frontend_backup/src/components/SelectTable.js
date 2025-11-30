// src/components/SelectTable.js (CORRECTED)
import React from "react";
import { useNavigate } from "react-router-dom";
import "./SelectTable.css";

function SelectTable() {
  const navigate = useNavigate();
  const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 

  const handleSelect = (tableNumber) => {
    navigate(`/menu/${tableNumber}`); 
  };

  return (
    <div className="select-table-wrapper">
      <div className="select-table-container">
        <h2 className="welcome-header">Welcome! <h4> Please Select Your Table</h4>  </h2>
       
        
        <div className="table-grid">
          {tables.map((num) => (
            <button 
              key={num} 
              onClick={() => handleSelect(num)} 
              className="table-button"
            >
              Table {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectTable;
