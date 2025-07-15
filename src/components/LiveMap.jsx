import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const joggerIcon = new L.Icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const LiveMap = () => {
  const [position, setPosition] = useState([20.5937, 78.9629]);
  const [path, setPath] = useState([]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);
        setPath((prev) => [...prev, coords]);
      },
      (err) => {
        console.error("Map location error:", err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-2xl shadow-xl mb-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-indigo-300 mb-3">🗺️ Live Jogging Map</h2>

      <div className="rounded-xl overflow-hidden border border-indigo-500">
        <MapContainer
          center={position}
          zoom={17}
          scrollWheelZoom={true}
          style={{ height: '300px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />
          <Marker position={position} icon={joggerIcon} />
          {path.length > 1 && <Polyline positions={path} color="lime" />}
        </MapContainer>
      </div>

      <p className="text-xs text-gray-400 text-center mt-2">
        Your route is shown live with marker & path
      </p>
    </div>
  );
};

export default LiveMap;
