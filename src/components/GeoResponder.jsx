import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Phone, ShieldCheck, AlertCircle } from 'lucide-react';

import LiveGridMap from './LiveGridMap';

const GeoResponder = ({ patientLat = 19.076, patientLng = 72.877 }) => {
  const [responderPos, setResponderPos] = useState({ lat: 19.080, lng: 72.885 });
  const [distance, setDistance] = useState(1.2);
  const [eta, setEta] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setResponderPos(prev => ({
        lat: prev.lat - 0.0001,
        lng: prev.lng - 0.0001
      }));
      setDistance(prev => Math.max(0, prev - 0.05));
      setEta(prev => Math.max(0, prev - 0.2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const markers = [
    { position: [patientLat, patientLng], label: "Patient (You)", urgency: 'critical' },
    { position: [responderPos.lat, responderPos.lng], label: "Ambulance 04", urgency: 'low' }
  ];

  return (
    <div className="glass-card" style={{ padding: '2rem', background: '#fef2f2', border: '2px solid #f87171' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#991b1b' }}>SOS: Geo-Spatial Dispatch</h3>
          <p style={{ color: '#b91c1c', opacity: 0.8 }}>Nearest Level-1 Responder Routed</p>
        </div>
        <div className="badge badge-error" style={{ animation: 'pulse 1s infinite' }}>Live Tracking</div>
      </div>

      <div style={{ height: '300px', borderRadius: '20px', overflow: 'hidden', border: '1px solid #fecaca' }}>
        <LiveGridMap 
          center={[patientLat, patientLng]} 
          zoom={15} 
          markers={markers} 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '15px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#b91c1c' }}>Distance</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>{distance.toFixed(1)} km</div>
        </div>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '15px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#b91c1c' }}>ETA</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>{Math.ceil(eta)} min</div>
        </div>
        <button style={{ background: '#991b1b', color: 'white', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Phone size={20} />
        </button>
      </div>
    </div>
  );
};

export default GeoResponder;
