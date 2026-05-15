import React from 'react';
import { motion } from 'framer-motion';
import { Circle, CheckCircle2, AlertCircle, Calendar, ShieldCheck } from 'lucide-react';

const HealthTimeline = () => {
  const events = [
    { date: 'Oct 2025', title: 'Surgery: Appendix Removal', type: 'procedure', color: 'var(--primary)' },
    { date: 'Jan 2026', title: 'Critical SOS: BP Spike', type: 'emergency', color: 'var(--error)' },
    { date: 'Mar 2026', title: 'Lab: Lipid Profile Normal', type: 'lab', color: '#22c55e' },
    { date: 'May 2026', title: 'Consultation: General Checkup', type: 'consult', color: 'var(--accent)' },
    { date: 'July 2026', title: 'AI Analysis: High Stress Streak', type: 'ai', color: '#8b5cf6' },
  ];

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
        <Calendar size={24} color="var(--primary)" />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Lifelong Health Journey</h3>
      </div>

      <div style={{ position: 'relative', paddingLeft: '2rem' }}>
        {/* Timeline Line */}
        <div style={{ position: 'absolute', left: '7px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(180deg, var(--primary) 0%, var(--border) 100%)', opacity: 0.3 }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {events.map((event, i) => (
            <motion.div 
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              style={{ position: 'relative' }}
            >
              {/* Dot */}
              <div style={{ position: 'absolute', left: '-2rem', top: '5px', width: '16px', height: '16px', background: 'white', border: `3px solid ${event.color}`, borderRadius: '50%', zIndex: 2 }}></div>
              
              <div style={{ background: 'var(--background)', padding: '1.25rem', borderRadius: '15px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: event.color, textTransform: 'uppercase' }}>{event.date}</span>
                  {event.type === 'ai' && <ShieldCheck size={14} color="#8b5cf6" />}
                </div>
                <h4 style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.5rem' }}>{event.title}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  Record secured on National Health Stack • Block #{4500 + i}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <button style={{ width: '100%', marginTop: '2rem', padding: '1rem', background: 'transparent', border: '2px dashed var(--border)', borderRadius: '12px', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        Download Full Lifetime Record (PDF)
      </button>
    </div>
  );
};

export default HealthTimeline;
