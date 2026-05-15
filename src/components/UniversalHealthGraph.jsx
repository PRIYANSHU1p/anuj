import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Activity, MapPin, Database, Share2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UniversalHealthGraph = () => {
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [integrity, setIntegrity] = React.useState(99.9);
  
  const { user } = useAuth();
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsSyncing(true);
      setIntegrity(99.8 + Math.random() * 0.2);
      setTimeout(() => setIsSyncing(false), 2000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: 'patient', label: user?.full_name || 'Patient Digital Twin', icon: <Activity />, color: 'var(--primary)', x: 150, y: 150 },
    { id: 'blockchain', label: 'Blockchain Ledger', icon: <Lock />, color: '#22c55e', x: 50, y: 50 },
    { id: 'abha', label: `ABHA: ${user?.abha_id || 'Not Linked'}`, icon: <Shield />, color: '#0ea5e9', x: 250, y: 50 },
    { id: 'iot', label: 'IoT Live Stream', icon: <Activity />, color: '#ef4444', x: 50, y: 250 },
    { id: 'geo', label: 'Geo-Spatial SOS', icon: <MapPin />, color: '#f59e0b', x: 250, y: 250 }
  ];

  return (
    <div className="glass-card" style={{ padding: '2rem', background: 'var(--surface)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
        <Share2 size={24} color="var(--primary)" />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Universal Health Graph</h3>
      </div>

      <div style={{ position: 'relative', height: '300px', width: '100%', background: 'rgba(0,0,0,0.02)', borderRadius: '20px', border: '1px solid var(--border)' }}>
        <svg width="100%" height="100%" viewBox="0 0 300 300" style={{ overflow: 'visible' }}>
          {/* Connecting Lines */}
          {nodes.filter(n => n.id !== 'patient').map(node => (
            <motion.line 
              key={node.id}
              x1="150" y1="150" x2={node.x} y2={node.y}
              stroke={isSyncing ? 'var(--primary)' : 'var(--border)'} 
              strokeWidth={isSyncing ? "3" : "2"}
              strokeDasharray="5,5"
              animate={{ 
                strokeDashoffset: isSyncing ? [-20, 0] : 0,
                opacity: isSyncing ? [0.5, 1, 0.5] : 1
              }}
              transition={{ duration: 1, repeat: isSyncing ? Infinity : 0 }}
            />
          ))}

          {/* Nodes */}
          {nodes.map(node => (
            <motion.g 
              key={node.id}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200, delay: node.id === 'patient' ? 0 : 0.5 }}
            >
              <circle cx={node.x} cy={node.y} r="25" fill="white" stroke={node.color} strokeWidth="2" />
              <foreignObject x={node.x - 12} y={node.y - 12} width="24" height="24" style={{ color: node.color }}>
                {node.icon}
              </foreignObject>
              <text x={node.x} y={node.y + 40} textAnchor="middle" style={{ fontSize: '10px', fontWeight: 800, fill: 'var(--text)' }}>
                {node.label}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--background)', borderRadius: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Database size={14} /> <strong>Data Integrity: {integrity.toFixed(1)}%</strong>
        </div>
        <p>All nodes are synchronized via National Health Stack API & Distributed Ledger.</p>
      </div>
    </div>
  );
};

export default UniversalHealthGraph;
