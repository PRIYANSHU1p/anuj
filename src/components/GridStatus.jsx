import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe } from 'lucide-react';

const GridStatus = () => {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      style={{ 
        position: 'fixed', 
        bottom: '1.5rem', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 10000,
        display: 'flex',
        gap: '2rem',
        padding: '0.75rem 2rem',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(15px)',
        borderRadius: '100px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
        color: 'white',
        fontSize: '0.75rem',
        fontWeight: 800,
        pointerEvents: 'none'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Shield size={14} color="#22c55e" />
        <span>SYSTEM INTEGRITY: <span style={{ color: '#22c55e' }}>99.9%</span></span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Zap size={14} color="#eab308" />
        <span>LIVE NODES: <span style={{ color: '#eab308' }}>ACTIVE</span></span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Globe size={14} color="#3b82f6" />
        <span>RESPONSE GRID: <span style={{ color: '#3b82f6' }}>STABLE</span></span>
      </div>
      
      {/* Small pulsing indicator */}
      <div style={{ position: 'absolute', right: '-5px', top: '-5px' }}>
        <span style={{ display: 'block', width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 10px #22c55e' }}></span>
      </div>
    </motion.div>
  );
};

export default GridStatus;
