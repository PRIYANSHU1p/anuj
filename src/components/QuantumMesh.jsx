import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Lock, Shield } from 'lucide-react';

const QuantumMesh = () => {
  const nodes = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 300,
    y: Math.random() * 200,
    size: Math.random() * 4 + 2
  }));

  return (
    <div className="glass-card" style={{ padding: '2rem', background: 'var(--surface)', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
        <Share2 size={24} color="var(--primary)" />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Quantum P2P Data Mesh</h3>
      </div>

      <div style={{ position: 'relative', height: '220px', background: 'rgba(0,0,0,0.02)', borderRadius: '20px', border: '1px solid var(--border)' }}>
        <svg width="100%" height="100%" viewBox="0 0 300 200" style={{ overflow: 'visible' }}>
          {/* Connecting Mesh Lines */}
          {nodes.map((node, i) => (
            nodes.slice(i + 1, i + 4).map((target, j) => (
              <motion.line 
                key={`${i}-${j}`}
                x1={node.x} y1={node.y} x2={target.x} y2={target.y}
                stroke="var(--primary-light)" strokeWidth="0.5" strokeOpacity="0.2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              />
            ))
          ))}

          {/* Shard Nodes */}
          {nodes.map(node => (
            <motion.circle 
              key={node.id}
              cx={node.x} cy={node.y} r={node.size}
              fill="var(--primary)"
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: 2 + Math.random(), repeat: Infinity }}
            />
          ))}
        </svg>

        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', fontWeight: 800 }}>
          <span style={{ color: 'var(--primary)' }}>SHARDS: 4,096 ACTIVE</span>
          <span style={{ color: '#22c55e' }}>INTEGRITY: 100%</span>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <Lock size={14} /> Data split into tamper-proof quantum fragments.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <Shield size={14} /> Verified by National Mesh Consensus.
        </div>
      </div>
    </div>
  );
};

export default QuantumMesh;
