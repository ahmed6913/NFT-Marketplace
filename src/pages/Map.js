import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const RecenterMap = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) map.setView(location, 16);
  }, [location, map]);
  return null;
};

const MapPage = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState('street');

  const fetchLocation = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }
    fetchLocation();
  }, []);

  const tileUrls = {
    street: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite:
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  };

  const attributions = {
    street: '&copy; OpenStreetMap contributors',
    satellite:
      'Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS Community',
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-indigo-600">Your Live Location</h2>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-4">
        <button
          onClick={() => setViewType(viewType === 'street' ? 'satellite' : 'street')}
          className="px-4 py-2 bg-indigo-600 text-white  rounded-md shadow  hover:bg-indigo-700 transition"
        >
          Switch to {viewType === 'street' ? 'Satellite' : 'Street'} View
        </button>
        <button
          onClick={fetchLocation}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
        >
           Refresh Location
        </button>
      </div>

      {/* Status */}
      {loading && (
        <div className="text-gray-500 bg-indigo-50 px-4 py-2 rounded shadow inline-block mb-4">
          Getting your current location...
        </div>
      )}

      {error && (
        <div className="text-red-600 bg-red-50 px-4 py-2 rounded shadow inline-block mb-4">
          {error}
        </div>
      )}

      {/* Map */}
      {location && (
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={16}
          scrollWheelZoom={true}
          style={{ height: '500px', width: '100%', borderRadius: '12px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
        >
          <TileLayer url={tileUrls[viewType]} attribution={attributions[viewType]} />
          <Marker position={[location.lat, location.lng]}>
            <Popup>
              📍 You are here! <br />
              Lat: {location.lat.toFixed(5)}, Lng: {location.lng.toFixed(5)}
            </Popup>
          </Marker>
          <RecenterMap location={[location.lat, location.lng]} />
        </MapContainer>
      )}
    </div>
  );
};

export default MapPage;
