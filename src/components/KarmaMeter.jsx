import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, TrendingUp } from 'lucide-react';

const KarmaMeter = ({ points = 1250, rank = 'Healing Soul' }) => {
  const nextLevel = 2000;
  const progress = (points / nextLevel) * 100;

  return (
    <div className="glass-card" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.1, transform: 'rotate(15deg)' }}>
        <Award size={150} color="var(--primary)" />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Health Karma (Seva)</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, marginTop: '0.25rem' }}>
            <Star size={18} fill="var(--primary)" /> {rank}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900 }}>{points}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Next level: {nextLevel}</div>
        </div>
      </div>

      <div style={{ height: '12px', background: 'var(--background)', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        {[
          { label: 'Consistency', pts: '+50' },
          { label: 'Reports', pts: '+100' },
          { label: 'Helpful', pts: '+200' }
        ].map((badge, i) => (
          <div key={i} style={{ flex: 1, padding: '0.75rem', background: 'var(--background)', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{badge.label}</div>
            <div style={{ fontWeight: 800, color: 'var(--primary)' }}>{badge.pts}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KarmaMeter;
