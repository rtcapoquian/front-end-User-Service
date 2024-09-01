import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ latitude, longitude, onMapClick }) => {
  // Default position (e.g., Manila, Philippines)
  const defaultPosition = [14.599512, 120.984222];

  // State to hold the current position
  const [position, setPosition] = useState(defaultPosition);

  // Update position when latitude and longitude props change
  useEffect(() => {
    if (latitude && longitude) {
      setPosition([latitude, longitude]);
    }
  }, [latitude, longitude]);

  // Custom component to handle map click events
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onMapClick({ lat, lng }); // Pass the coordinates back to the parent component
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={position}
        icon={L.icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          shadowSize: [41, 41],
        })}
      >
        <Popup>
          Latitude: {position[0].toFixed(4)}
          <br />
          Longitude: {position[1].toFixed(4)}
        </Popup>
      </Marker>
      <MapClickHandler /> {/* Component to handle clicks */}
    </MapContainer>
  );
};

export default MapComponent;
