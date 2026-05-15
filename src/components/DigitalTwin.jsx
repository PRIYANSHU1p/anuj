import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Heart, Zap } from 'lucide-react';

const DigitalTwin = ({ score = 85, status = 'Stable' }) => {
  // Determine color based on score
  const color = score > 80 ? '#22c55e' : score > 50 ? '#f59e0b' : '#ef4444';
  
  return (
    <div style={{ position: 'relative', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Background Pulse */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: color,
        }}
      />

      {/* Outer Rotating Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          width: '240px',
          height: '240px',
          border: `2px dashed ${color}`,
          borderRadius: '50%',
          opacity: 0.3
        }}
      />

      {/* Central Identity Core */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        borderRadius: '30px',
        border: `1px solid ${color}`,
        boxShadow: `0 20px 40px ${color}20`
      }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ color: color, marginBottom: '0.5rem' }}
        >
          <Heart size={48} fill={color} />
        </motion.div>
        <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text)' }}>{score}</div>
        <div style={{ fontSize: '0.875rem', fontWeight: 800, color: color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Health Score: {status}
        </div>
      </div>

      {/* Floating Risk Indicators */}
      <div style={{ position: 'absolute', top: '10%', right: '10%', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.5rem 1rem', borderRadius: '15px', border: '1px solid var(--border)', fontSize: '0.75rem', fontWeight: 700 }}>
        <ShieldAlert size={16} color="#f59e0b" /> 72h Cardiac Risk: Low
      </div>
      
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.5rem 1rem', borderRadius: '15px', border: '1px solid var(--border)', fontSize: '0.75rem', fontWeight: 700 }}>
        <Zap size={16} color="#0ea5e9" /> Recovery Rate: Optimal
      </div>
    </div>
  );
};

export default DigitalTwin;
