import { useEffect, useState, useRef } from 'react';
import { calculateDistance } from '../utils/calculateDistance';
import React from 'react';

const LocationTracker = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const prevCoords = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, speed } = position.coords;

        setLocation({
          lat: latitude.toFixed(5),
          lon: longitude.toFixed(5),
        });

        setSpeed((speed * 3.6 || 0).toFixed(2)); 
        if (prevCoords.current) {
          const dist = calculateDistance(
            prevCoords.current.lat,
            prevCoords.current.lon,
            latitude,
            longitude
          );
          setDistance((prev) => prev + dist);
        }

        prevCoords.current = { lat: latitude, lon: longitude };
      },
      (err) => {
        console.error(err);
        alert("Unable to fetch location");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-gray-900 p-6 rounded-2xl shadow-xl mb-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-teal-300">📍 Location Tracker</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-gray-800 rounded-xl p-4 border border-teal-500">
          <p className="text-sm text-gray-400">Latitude</p>
          <p className="text-xl font-bold text-white">{location.lat ?? '...'}</p>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-4 border border-teal-500">
          <p className="text-sm text-gray-400">Longitude</p>
          <p className="text-xl font-bold text-white">{location.lon ?? '...'}</p>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-4 border border-teal-500">
          <p className="text-sm text-gray-400">Speed (km/h)</p>
          <p className="text-xl font-bold text-white">{speed}</p>
        </div>
      </div>

      <div className="mt-4 bg-gray-800 p-4 rounded-xl border border-teal-500 text-center">
        <p className="text-sm text-gray-400">Distance Covered</p>
        <p className="text-2xl font-bold text-green-400">{distance.toFixed(2)} km</p>
      </div>
    </div>
  );
};

export default LocationTracker;
