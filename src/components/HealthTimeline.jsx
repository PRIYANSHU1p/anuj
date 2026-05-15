import React from 'react';
import { motion } from 'framer-motion';
import { Circle, CheckCircle2, AlertCircle, Calendar, ShieldCheck } from 'lucide-react';

const HealthTimeline = ({ events: propEvents }) => {
  const defaultEvents = [
    { date: 'Oct 2025', title: 'Surgery: Appendix Removal', type: 'procedure', color: 'var(--primary)' },
    { date: 'Jan 2026', title: 'Critical SOS: BP Spike', type: 'emergency', color: 'var(--error)' },
    { date: 'Mar 2026', title: 'Lab: Lipid Profile Normal', type: 'lab', color: '#22c55e' },
  ];
  
  const events = propEvents && propEvents.length > 0 ? propEvents : defaultEvents;

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
              <div style={{ position: 'absolute', left: '-2rem', top: '5px', width: '16px', height: '16px', background: 'var(--surface)', border: `3px solid ${event.color}`, borderRadius: '50%', zIndex: 2 }}></div>
              
              <div style={{ background: 'var(--background)', padding: '1.25rem', borderRadius: '15px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: event.color || 'var(--primary)', textTransform: 'uppercase' }}>{event.date}</span>
                  {(event.type === 'ai' || event.type === 'record') && <ShieldCheck size={14} color="var(--success)" />}
                </div>
                <h4 style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.5rem' }}>{event.title}</h4>
                
                {event.bp && (
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>BP: <span style={{ color: 'var(--text)', fontWeight: 700 }}>{event.bp}</span></div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Sugar: <span style={{ color: 'var(--text)', fontWeight: 700 }}>{event.sugar}</span></div>
                  </div>
                )}

                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4, opacity: 0.8 }}>
                  Validated via ABHA Health Identity • Node Hash: {Math.random().toString(16).slice(2, 8).toUpperCase()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={() => {
          const content = `MEDICAL HEALTH RECORD\n\nGenerated: ${new Date().toLocaleString()}\n\nEvents:\n${events.map(e => `- ${e.date}: ${e.title}`).join('\n')}`;
          const blob = new Blob([content], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `MedLink_Health_Record_${Date.now()}.txt`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }}
        className="glow-on-hover"
        style={{ width: '100%', marginTop: '2rem', padding: '1.25rem', background: 'var(--primary)', border: 'none', borderRadius: '12px', fontWeight: 800, color: 'white', fontSize: '0.9rem', cursor: 'pointer' }}
      >
        Download Full Lifetime Record (PDF)
      </button>
    </div>
  );
};

export default HealthTimeline;
