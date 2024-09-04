import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import api from "../../api";

const ScanQr = () => {
  const [scanning, setScanning] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [verificationTitle, setVerificationTitle] = useState("");

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
          setVerificationTitle("Success");
          setVerificationMessage(
            "Verification successful! You are registered for this event."
          );
        } else {
          setVerificationTitle("Failed");
          setVerificationMessage(
            "Verification failed. You are not registered for this event."
          );
        }
      } catch (error) {
        console.error("Error verifying QR code:", error);
        setVerificationTitle("Error");
        setVerificationMessage("You are not registered for this event.");
      } finally {
        setScanning(false); // Reset scanning state
        setShowDialog(true); // Show the dialog with verification result
      }
    }
  };

  return (
    <div className="container mx-auto p-4 text-foreground px-48">
      <h2 className="text-2xl font-semibold mb-4 text-center">Scan QR Code</h2>
      <div className="flex justify-center mb-4 px-96 ">
        <Scanner
          onScan={handleScan}
          className="w-64 h-64 border-2 border-gray-300 rounded-lg"
        />
      </div>
      <div className="text-center">
        <Button
          className="bg-blue-500 text-white py-2 px-4 rounded shadow-md"
          onClick={() => setShowDialog(true)}
        >
          View Scan Result
        </Button>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {verificationTitle}
            </DialogTitle>
            <DialogDescription>
              <div className="text-center">
                <p className="text-lg font-semibold mb-4">
                  {verificationMessage}
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setShowDialog(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScanQr;
