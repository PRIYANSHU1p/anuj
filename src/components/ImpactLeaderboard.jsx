import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, TrendingUp, Heart } from 'lucide-react';

const ImpactLeaderboard = () => {
  const doctors = [
    { name: 'Dr. Sameer', score: 980, impact: 'Rural Hero', recovery: 94 },
    { name: 'Dr. Priya', score: 920, impact: 'Speed Master', recovery: 89 },
    { name: 'Dr. Anuj (You)', score: 850, impact: 'Rising Star', recovery: 92 },
    { name: 'Dr. Vikram', score: 780, impact: 'Counseling Pro', recovery: 85 },
  ];

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Trophy size={28} color="#f59e0b" />
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>National Impact Leaderboard</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {doctors.map((doc, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem',
              background: doc.name.includes('(You)') ? 'var(--primary-light)' : 'var(--background)',
              borderRadius: '15px',
              border: doc.name.includes('(You)') ? '1px solid var(--primary)' : '1px solid transparent'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-muted)', width: '30px' }}>#{i + 1}</div>
              <div>
                <div style={{ fontWeight: 800 }}>{doc.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>{doc.impact}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 900, color: 'var(--text)' }}>{doc.score} pts</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{doc.recovery}% Recovery</div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button style={{ width: '100%', marginTop: '1.5rem', padding: '1rem', background: 'transparent', border: '2px dashed var(--border)', borderRadius: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
        View All 12.4K Doctors
      </button>
    </div>
  );
};

export default ImpactLeaderboard;
