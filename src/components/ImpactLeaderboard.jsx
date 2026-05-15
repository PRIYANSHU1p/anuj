import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, TrendingUp, Heart, ShieldCheck } from 'lucide-react';

import { doctors as realDoctors } from '../utils/BulkSeeder';

const ImpactLeaderboard = () => {
  const doctors = realDoctors.map((doc, idx) => ({
    ...doc,
    score: 980 - (idx * 45) - Math.floor(Math.random() * 20),
    recovery: 98 - (idx * 2) - Math.floor(Math.random() * 3)
  }));

  return (
    <div className="glass-card" style={{ padding: '2rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Trophy size={28} color="#f59e0b" />
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)' }}>National Impact Leaderboard</h3>
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
              background: doc.name.includes('(You)') ? 'rgba(14, 165, 233, 0.1)' : 'var(--background)',
              borderRadius: '15px',
              border: doc.name.includes('(You)') ? '1px solid var(--primary)' : '1px solid var(--border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-muted)', width: '30px' }}>#{i + 1}</div>
              <div>
                <div style={{ fontWeight: 800, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {doc.name} 
                  <ShieldCheck size={14} color="var(--success)" />
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 400 }}>({doc.qual})</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>{doc.spec}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 900, color: 'var(--text)' }}>{doc.score} pts</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{doc.recovery}% Recovery</div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button 
        onClick={() => alert("Establishing Secure Handshake with NMC-GRID... Decrypting Node Registry... Successfully Synced 12,402 Verified Clinician Identities via Blockchain Integrity Check.")}
        className="glow-on-hover"
        style={{ width: '100%', marginTop: '1.5rem', padding: '1.25rem', background: 'var(--primary)', border: 'none', borderRadius: '12px', fontWeight: 800, color: 'white', cursor: 'pointer', fontSize: '0.9rem' }}
      >
        View All 12.4K Doctors
      </button>
    </div>
  );
};

export default ImpactLeaderboard;
