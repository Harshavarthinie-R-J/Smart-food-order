import React from "react";
import { QRCodeCanvas } from "qrcode.react";

function SingleQR() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Scan this QR to Start Ordering</h2>
      <QRCodeCanvas value="http://localhost:3000/select-table" size={256} />
      <p>After scanning, select your table number to continue.</p>
    </div>
  );
}

export default SingleQR;
