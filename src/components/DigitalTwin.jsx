import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Heart, Zap } from 'lucide-react';

const DigitalTwin = ({ score = 85, status = 'Stable', bp = '120/80', sugar = '95 mg/dL' }) => {
  // Determine color based on score
  const color = score > 80 ? '#22c55e' : score > 50 ? '#f59e0b' : '#ef4444';
  
  return (
    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
      <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            width: '180px',
            height: '180px',
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
            width: '220px',
            height: '220px',
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
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          padding: '1.5rem',
          borderRadius: '50%',
          width: '160px',
          height: '160px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${color}`,
          boxShadow: `0 20px 40px ${color}20`
        }}>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{ color: color, marginBottom: '0.25rem' }}
          >
            <Heart size={32} fill={color} />
          </motion.div>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text)', lineHeight: 1 }}>{score}</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: color, textTransform: 'uppercase', marginTop: '0.25rem' }}>
            {status}
          </div>
        </div>
      </div>

      {/* Vital Metrics Grid (No Overlap) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%' }}>
        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center', background: 'rgba(255,255,255,0.5)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Blood Pressure</div>
          <div style={{ fontWeight: 800, color: 'var(--text)' }}>{bp}</div>
        </div>
        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center', background: 'rgba(255,255,255,0.5)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Blood Sugar</div>
          <div style={{ fontWeight: 800, color: 'var(--text)' }}>{sugar}</div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwin;
