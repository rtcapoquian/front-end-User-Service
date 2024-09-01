import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import api from "../../api";

const ScanQr = () => {
  const [scanning, setScanning] = useState(false);

  const handleScan = async (result) => {
    if (result && result[0].rawValue) {
      const qrCode = result[0].rawValue;
      console.log("Scanned QR Code Value:", qrCode);

      if (scanning) return; // Prevent handling new scans if already processing

      setScanning(true); // Set scanning state to true

      try {
        // Use POST request and include the QR code in the request body
        const response = await api.post("/api/events/attendees/verify", {
          qrCode,
        });

        if (response.data) {
          alert("Verification successful! You are registered for this event.");
        } else {
          alert("Verification failed. You are not registered for this event.");
        }
      } catch (error) {
        console.error("Error verifying QR code:", error);
        alert("Error verifying QR code. Please try again.");
      } finally {
        setScanning(false); // Reset scanning state
        window.location.reload(); // Refresh the page after processing
      }
    }
  };

  return (
    <div>
      <h2>Scan QR Code</h2>
      <Scanner onScan={handleScan} />
    </div>
  );
};

export default ScanQr;
