import React from 'react';
import { motion } from 'framer-motion';

const ElysianHologram = ({ distressLevel = 0 }) => {
  const isPanic = distressLevel > 70;
  const pulseColor = isPanic ? 'rgba(244, 63, 94, 0.6)' : 'rgba(14, 165, 233, 0.4)';

  return (
    <div className="glass-card" style={{ 
      height: '400px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--surface)'
    }}>
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isPanic ? 'var(--error)' : '#22c55e', animation: 'pulse 1.5s infinite' }} />
        <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {isPanic ? 'Distress Detected' : 'Elysian Twin Active'}
        </span>
      </div>

      {/* 3D Hologram Effect */}
      <div style={{ position: 'relative', width: '200px', height: '200px' }}>
        <motion.div 
          animate={{ rotateY: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ 
            width: '100%', 
            height: '100%', 
            borderRadius: '50%', 
            border: `2px solid ${pulseColor}`,
            boxShadow: `0 0 40px ${pulseColor}`,
            position: 'relative'
          }}
        >
          {/* Internal Scan Lines */}
          <div style={{ 
            position: 'absolute', 
            top: '0', 
            left: '0', 
            width: '100%', 
            height: '2px', 
            background: pulseColor, 
            animation: 'scan 2s infinite' 
          }} />
          
          {/* Vitals Data Overlay */}
          <div style={{ 
            position: 'absolute', 
            inset: '0', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 900,
            color: 'var(--text)'
          }}>
            {distressLevel}<span style={{ fontSize: '1rem' }}>%</span>
            <div style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-muted)' }}>DISTRESS</div>
          </div>
        </motion.div>

        {/* Outer Glow Orbs */}
        {[1, 2, 3].map(i => (
          <motion.div 
            key={i}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 3, delay: i, repeat: Infinity }}
            style={{ 
              position: 'absolute', 
              inset: `-${i * 20}px`, 
              borderRadius: '50%', 
              border: `1px solid ${pulseColor}`,
              zIndex: -1 
            }}
          />
        ))}
      </div>

      <div style={{ marginTop: '3rem', width: '80%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.7rem', fontWeight: 800 }}>
          <span>NEURAL SYNC</span>
          <span>99.2%</span>
        </div>
        <div style={{ height: '4px', width: '100%', background: 'var(--border)', borderRadius: '2px' }}>
          <motion.div animate={{ width: '99.2%' }} style={{ height: '100%', background: 'var(--primary)', borderRadius: '2px' }} />
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ElysianHologram;
