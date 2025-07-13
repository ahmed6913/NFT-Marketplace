// /src/pages/Map.js

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const MapPage = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError('Failed to get location. Please allow location access.');
        console.error(err);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Your Live Location</h2>

      {loading && (
        <div className="text-gray-500 bg-indigo-50 px-4 py-2 rounded shadow inline-block">
          Getting your current location...
        </div>
      )}

      {error && (
        <div className="text-red-600 bg-red-50 px-4 py-2 rounded shadow inline-block">
          {error}
        </div>
      )}

      {location && (
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={16}
          scrollWheelZoom={true}
          style={{ height: '500px', width: '100%', borderRadius: '12px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
          className="mt-4"
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[location.lat, location.lng]}>
            <Popup>
              📍 You are here! <br /> Lat: {location.lat.toFixed(5)}, Lng: {location.lng.toFixed(5)}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapPage;
