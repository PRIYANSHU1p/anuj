import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Heart, Zap } from 'lucide-react';

const DigitalTwin = ({ score = 85, status = 'Stable', bp = '120/80', sugar = '95 mg/dL', heartRate = 72 }) => {
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
          background: 'var(--surface)',
          backdropFilter: 'blur(20px)',
          padding: '1.5rem',
          borderRadius: '50%',
          width: '160px',
          height: '160px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: `2px solid ${color}40`,
          boxShadow: `0 0 30px ${color}15, inset 0 0 20px ${color}10`
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
          {heartRate > 0 && (
            <div style={{ position: 'absolute', bottom: '-5px', background: 'var(--error)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)' }}>
              <Zap size={10} fill="white" /> {heartRate} BPM
            </div>
          )}
        </div>
      </div>

      {/* Vital Metrics Grid (No Overlap) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%' }}>
        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center', background: 'var(--background)', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 700 }}>Blood Pressure</div>
          <div style={{ fontWeight: 900, color: 'var(--text)', fontSize: '1.1rem' }}>{bp}</div>
        </div>
        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center', background: 'var(--background)', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 700 }}>Blood Sugar</div>
          <div style={{ fontWeight: 900, color: 'var(--text)', fontSize: '1.1rem' }}>{sugar}</div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwin;
