import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Zap, Shield, Share2 } from 'lucide-react';

const NetworkSlicingUI = () => {
  const [packets, setPackets] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const type = Math.random() > 0.7 ? 'CRITICAL' : 'STANDARD';
      const id = Math.random().toString(36).substring(7);
      setPackets(prev => [...prev.slice(-10), { id, type, x: 0 }]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card" style={{ padding: '2rem', background: 'var(--surface)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Radio size={24} color="var(--primary)" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>National 5G Slicing Monitor</h3>
        </div>
        <div className="badge badge-primary">QoS: 0.1ms Latency</div>
      </div>

      <div style={{ position: 'relative', height: '150px', background: 'rgba(0,0,0,0.02)', borderRadius: '15px', border: '1px solid var(--border)', overflow: 'hidden' }}>
        {/* Priority Lane */}
        <div style={{ position: 'absolute', top: '10%', left: '0', width: '100%', height: '35%', background: 'rgba(14, 165, 233, 0.05)', borderBottom: '1px dashed var(--primary-light)' }}>
          <span style={{ position: 'absolute', right: '1rem', top: '0.2rem', fontSize: '0.6rem', fontWeight: 900, color: 'var(--primary)' }}>MEDICAL PRIORITY SLICE</span>
        </div>

        {/* Packet Animation */}
        <AnimatePresence>
          {packets.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: '1000%', opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: p.type === 'CRITICAL' ? 1 : 3, ease: "linear" }}
              style={{
                position: 'absolute',
                top: p.type === 'CRITICAL' ? '20%' : '60%',
                width: '12px',
                height: '12px',
                borderRadius: '3px',
                background: p.type === 'CRITICAL' ? 'var(--primary)' : 'var(--text-muted)',
                boxShadow: p.type === 'CRITICAL' ? '0 0 10px var(--primary)' : 'none',
                zIndex: 2
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ padding: '1rem', background: 'var(--background)', borderRadius: '12px', fontSize: '0.75rem' }}>
          <div style={{ color: 'var(--primary)', fontWeight: 800, marginBottom: '0.25rem' }}>THROUGHPUT</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>14.2 GBPS</div>
        </div>
        <div style={{ padding: '1rem', background: 'var(--background)', borderRadius: '12px', fontSize: '0.75rem' }}>
          <div style={{ color: '#22c55e', fontWeight: 800, marginBottom: '0.25rem' }}>RELIABILITY</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>99.999%</div>
        </div>
      </div>
    </div>
  );
};

export default NetworkSlicingUI;
