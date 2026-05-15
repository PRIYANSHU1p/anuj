import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../context/ThemeContext';

let DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const LiveGridMap = ({ center = [20.5937, 78.9629], zoom = 5, markers = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{ minHeight: '500px', height: '100%', width: '100%', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)', position: 'relative' }}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url={isDark 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          }
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {markers.map((m, i) => (
          <React.Fragment key={i}>
            <Marker position={m.position}>
              <Popup>
                <div style={{ padding: '0.5rem' }}>
                  <strong style={{ color: m.urgency === 'critical' ? 'var(--error)' : 'var(--primary)' }}>
                    {m.urgency?.toUpperCase()} Emergency
                  </strong>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem' }}>{m.label}</p>
                </div>
              </Popup>
            </Marker>
            {m.urgency === 'critical' && (
              <Circle 
                center={m.position} 
                pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }} 
                radius={2000} 
              />
            )}
          </React.Fragment>
        ))}
      </MapContainer>
      
      {/* HUD Overlay */}
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1000, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.75rem', fontWeight: 800 }}>
        LIVE GEOSPATIAL NODE: ACTIVE
      </div>
    </div>
  );
};

export default LiveGridMap;
