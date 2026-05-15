import React from 'react';
import { motion } from 'framer-motion';

const ElysianHologram = ({ distressLevel = 0 }) => {
  const [syncRate, setSyncRate] = React.useState(99.2);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSyncRate(prev => (98.5 + Math.random() * 1.3).toFixed(1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isPanic = distressLevel > 70;
  const pulseColor = isPanic ? 'rgba(244, 63, 94, 0.6)' : 'rgba(14, 165, 233, 0.4)';

  return (
    <div className="glass-card" style={{ 
      height: '450px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--surface)',
      border: '1px solid var(--border)'
    }}>
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isPanic ? 'var(--error)' : '#22c55e', animation: 'pulse 1.5s infinite' }} />
        <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)' }}>
          {isPanic ? 'Distress Detected' : 'Elysian Twin Active'}
        </span>
      </div>

      {/* 3D Hologram Effect */}
      <div style={{ position: 'relative', width: '250px', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          animate={{ rotateY: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ 
            width: '200px', 
            height: '200px', 
            borderRadius: '50%', 
            border: `1px solid ${pulseColor}`,
            boxShadow: `0 0 50px ${pulseColor}`,
            position: 'absolute',
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.05) 0%, transparent 70%)'
          }}
        />

        {/* DNA Helix Core */}
        <svg width="200" height="200" viewBox="0 0 200 200" style={{ position: 'absolute', zIndex: 1 }}>
          <motion.g className="dna-rotate" style={{ transformOrigin: 'center' }}>
            {[...Array(8)].map((_, i) => (
              <React.Fragment key={i}>
                <motion.circle 
                  r="3" fill="var(--primary)"
                  animate={{ 
                    cx: [100 + Math.sin(i) * 30, 100 - Math.sin(i) * 30],
                    cy: 40 + i * 18,
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                />
                <motion.circle 
                  r="3" fill="var(--accent)"
                  animate={{ 
                    cx: [100 - Math.sin(i) * 30, 100 + Math.sin(i) * 30],
                    cy: 40 + i * 18,
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                />
              </React.Fragment>
            ))}
          </motion.g>
        </svg>
          
        {/* Vitals Data Overlay */}
        <div style={{ 
          position: 'relative', 
          zIndex: 10,
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '2.5rem',
          fontWeight: 900,
          color: 'var(--text)',
          textShadow: '0 0 10px rgba(255,255,255,0.5)'
        }}>
          <motion.span animate={{ scale: isPanic ? [1, 1.1, 1] : 1 }} transition={{ repeat: Infinity, duration: 0.5 }}>
            {distressLevel}
          </motion.span>
          <span style={{ fontSize: '1.25rem' }}>%</span>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.2em' }}>SYSTEM LOAD</div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', width: '80%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.7rem', fontWeight: 800 }}>
          <span>NEURAL SYNC</span>
          <span>{syncRate}%</span>
        </div>
        <div style={{ height: '6px', width: '100%', background: 'var(--background)', borderRadius: '3px', overflow: 'hidden' }}>
          <motion.div animate={{ width: `${syncRate}%` }} style={{ height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }} />
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
