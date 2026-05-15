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
    <div className="glass-card" style={{ padding: '2rem', background: 'rgba(239, 68, 68, 0.05)', border: '2px solid var(--error)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--error)' }}>SOS: Geo-Spatial Dispatch</h3>
          <p style={{ color: 'var(--error)', opacity: 0.8, fontWeight: 600 }}>Nearest Level-1 Responder Routed</p>
        </div>
        <div className="badge badge-error" style={{ animation: 'pulse 1s infinite' }}>Live Tracking</div>
      </div>

      <div style={{ height: '350px', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
        <LiveGridMap 
          center={[patientLat, patientLng]} 
          zoom={15} 
          markers={markers} 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
        <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: '15px', textAlign: 'center', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--error)', fontWeight: 800 }}>Distance</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text)' }}>{distance.toFixed(1)} km</div>
        </div>
        <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: '15px', textAlign: 'center', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--error)', fontWeight: 800 }}>ETA</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text)' }}>{Math.ceil(eta)} min</div>
        </div>
        <button 
          onClick={() => window.location.href = 'tel:102'}
          style={{ background: 'var(--error)', color: 'white', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(239, 68, 68, 0.3)', cursor: 'pointer' }}
        >
          <Phone size={24} />
        </button>
      </div>
    </div>
  );
};

export default GeoResponder;
