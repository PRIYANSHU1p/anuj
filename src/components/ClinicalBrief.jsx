import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertTriangle, ListChecks, Zap } from 'lucide-react';

const ClinicalBrief = ({ patientName = "Anuj", summary = "", flags = [] }) => {
  const mockSummary = "Patient has a 2-year history of hypertension. Recent SOS alerts (2 in 30 days) show a correlation with monsoon-related humidity spikes. Immediate focus needed on respiratory stability.";
  const mockFlags = ["Recurrent BP Spikes", "Drug Allergy: Penicillin", "High Stress Zone"];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card" 
      style={{ padding: '2rem', border: '2px solid var(--primary-light)', background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(255, 255, 255, 0.8) 100%)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: '10px' }}>
            <Sparkles size={20} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>AI Clinical Impression: {patientName}</h3>
        </div>
        <div className="badge badge-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={14} /> Generated in 0.4s
        </div>
      </div>

      <p style={{ lineHeight: 1.6, color: 'var(--text)', fontSize: '0.95rem', marginBottom: '1.5rem', fontStyle: 'italic', background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
        "{summary || mockSummary}"
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ background: '#fff1f2', padding: '1rem', borderRadius: '15px', border: '1px solid #fecaca' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991b1b', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
            <AlertTriangle size={14} /> Critical Flags
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {(flags.length > 0 ? flags : mockFlags).map((flag, i) => (
              <span key={i} style={{ fontSize: '0.7rem', background: '#fee2e2', color: '#b91c1c', padding: '0.25rem 0.6rem', borderRadius: '6px', fontWeight: 700 }}>
                {flag}
              </span>
            ))}
          </div>
        </div>

        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '15px', border: '1px solid #bbf7d0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
            <ListChecks size={14} /> Recommended Action
          </div>
          <p style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: 600 }}>Perform ECG & Check Humidity Sensitivity.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ClinicalBrief;
