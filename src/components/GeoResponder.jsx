import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Phone, ShieldCheck, AlertCircle } from 'lucide-react';

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

  return (
    <div className="glass-card" style={{ padding: '2rem', background: '#fef2f2', border: '2px solid #f87171' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#991b1b' }}>SOS: Geo-Spatial Dispatch</h3>
          <p style={{ color: '#b91c1c', opacity: 0.8 }}>Nearest Level-1 Responder Routed</p>
        </div>
        <div className="badge badge-error" style={{ animation: 'pulse 1s infinite' }}>Live Tracking</div>
      </div>

      <div style={{ height: '200px', background: '#fee2e2', borderRadius: '20px', position: 'relative', overflow: 'hidden', border: '1px solid #fecaca' }}>
        {/* Simple Grid Background for Map feel */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(#fecaca 1px, transparent 1px), linear-gradient(90deg, #fecaca 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.5 }}></div>
        
        {/* Patient Marker */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 5 }}>
          <MapPin size={32} color="#ef4444" fill="#ef4444" />
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '40px', height: '40px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '50%', transform: 'translate(-50%, -50%)', animation: 'ping 2s infinite' }}></div>
        </div>

        {/* Responder Marker */}
        <motion.div 
          animate={{ x: 30, y: -40 }}
          style={{ position: 'absolute', top: '20%', right: '20%', zIndex: 10 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Navigation size={24} color="#0ea5e9" fill="#0ea5e9" style={{ transform: 'rotate(45deg)' }} />
            <div style={{ background: '#0ea5e9', color: 'white', fontSize: '0.6rem', padding: '0.2rem 0.5rem', borderRadius: '5px', fontWeight: 800, marginTop: '0.2rem' }}>Ambulance 04</div>
          </div>
        </motion.div>
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
