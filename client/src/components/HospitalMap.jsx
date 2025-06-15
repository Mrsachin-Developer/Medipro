import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue in React-Leaflet (ESM-friendly)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const HospitalMap = ({ hospitals }) => {
  if (!hospitals || hospitals.length === 0) {
    return (
      <div className="text-center text-gray-600">
        No hospitals to show on map.
      </div>
    );
  }

  const center = [hospitals[0].lat, hospitals[0].lon];

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hospitals.map((h, idx) => (
        <Marker key={idx} position={[h.lat, h.lon]}>
          <Popup>
            <strong>{h.name}</strong>
            <br />
            {h.address}
            <br />
            {h.phone && (
              <>
                Phone: {h.phone}
                <br />
              </>
            )}
            {h.isEmpanelledForScheme && (
              <span style={{ color: "green" }}>Supports Scheme</span>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default HospitalMap;
