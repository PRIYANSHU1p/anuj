import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Bell, ExternalLink } from 'lucide-react';

import { fetchHealthNews } from '../lib/groq';

const AIHealthNews = () => {
  const [news, setNews] = React.useState([]);

  React.useEffect(() => {
    fetchHealthNews().then(setNews);
  }, []);

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Newspaper size={24} color="var(--primary)" />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>National Health Intelligence</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {news.map((item, i) => (
          <div key={i} style={{ padding: '1.25rem', background: 'var(--background)', borderRadius: '15px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: item.color, background: `${item.color}10`, padding: '0.25rem 0.5rem', borderRadius: '5px' }}>
                {item.tag}
              </span>
              <ExternalLink size={14} color="var(--text-muted)" />
            </div>
            <p style={{ fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.4 }}>{item.title}</p>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--primary)', color: 'white', borderRadius: '12px', textAlign: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
        AI Analyzing 1,200+ Regional Feeds...
      </div>
    </div>
  );
};

export default AIHealthNews;
