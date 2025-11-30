import React from "react";
import TableQR from "./TableQR";

const TablesPage = () => {
  const tables = [1, 2, 3, 4, 5]; // Add all your table numbers

  return (
    <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
      {tables.map(t => <TableQR key={t} tableNumber={t} />)}
    </div>
  );
};

export default TablesPage;
