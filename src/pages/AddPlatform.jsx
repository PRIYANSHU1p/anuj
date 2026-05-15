import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  ChevronRight, 
  Info, 
  CheckCircle2, 
  Code2, 
  Layers, 
  Cpu, 
  Zap,
  Activity
} from 'lucide-react';

const frameworks = [
  { id: 'svelte', name: 'Svelte', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' },
  { id: 'react', name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { id: 'nuxt', name: 'Nuxt', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg' },
  { id: 'nextjs', name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { id: 'vue', name: 'Vue', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { id: 'angular', name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  { id: 'tanstack', name: 'TanStack Start', icon: 'https://avatars.githubusercontent.com/u/72518640?s=200&v=4' },
  { id: 'javascript', name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
];

const AddPlatform = () => {
  const [selected, setSelected] = useState(null);
  const [hostname, setHostname] = useState('localhost');

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
        style={{ padding: '3rem', minHeight: '80vh' }}
      >
        <div style={{ display: 'flex', gap: '4rem' }}>
          {/* Left Side - Configuration */}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 800 }}>
              Add <span className="text-gradient">Web platform</span>
            </h1>

            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, opacity: 0.6 }}>Type</span>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
                gap: '1rem' 
              }}>
                {frameworks.map((fw) => (
                  <motion.div
                    key={fw.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelected(fw.id)}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      border: `2px solid ${selected === fw.id ? 'var(--primary)' : 'var(--border)'}`,
                      background: selected === fw.id ? 'rgba(14, 165, 233, 0.05)' : 'var(--surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <img src={fw.icon} alt={fw.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{fw.name}</span>
                    {selected === fw.id && (
                      <CheckCircle2 size={16} color="var(--primary)" style={{ marginLeft: 'auto' }} />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, opacity: 0.6 }}>Details</span>
              </div>
              
              <div style={{ position: 'relative' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.8rem', 
                  marginBottom: '0.5rem', 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  Hostname <span style={{ opacity: 0.4 }}>optional</span>
                  <Info size={14} style={{ opacity: 0.4 }} />
                </label>
                <input 
                  type="text" 
                  value={hostname}
                  onChange={(e) => setHostname(e.target.value)}
                  placeholder="localhost"
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px' }}
                />
              </div>
            </div>

            <button 
              disabled={!selected}
              className="gradient-bg"
              style={{ 
                padding: '1rem 2.5rem', 
                borderRadius: '12px', 
                color: 'white', 
                fontWeight: 700,
                opacity: selected ? 1 : 0.5,
                cursor: selected ? 'pointer' : 'not-allowed',
                boxShadow: selected ? '0 10px 20px -5px rgba(14, 165, 233, 0.4)' : 'none'
              }}
            >
              Create platform
            </button>
          </div>

          {/* Right Side - Visual Preview */}
          <div style={{ 
            flex: 0.8, 
            background: 'rgba(0,0,0,0.02)', 
            borderRadius: '24px', 
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed var(--border)'
          }}>
            <div style={{ position: 'relative', width: '300px', height: '300px' }}>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  border: '2px dashed var(--primary-light)', 
                  borderRadius: '50%',
                  opacity: 0.2
                }} 
              />
              
              <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                width: '120px',
                height: '120px',
                background: 'white',
                borderRadius: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                zIndex: 2
              }}>
                {selected ? (
                  <motion.img 
                    key={selected}
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    src={frameworks.find(f => f.id === selected)?.icon} 
                    style={{ width: '60px' }} 
                  />
                ) : (
                  <Globe size={60} color="var(--primary)" opacity={0.2} />
                )}
              </div>

              {/* Decorative Nodes */}
              {[0, 90, 180, 270].map((angle, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 0.5 
                  }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '40px',
                    height: '40px',
                    background: 'white',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-140px) rotate(-${angle}deg)`
                  }}
                >
                  {i === 0 && <Code2 size={20} color="var(--primary)" />}
                  {i === 1 && <Layers size={20} color="var(--accent)" />}
                  {i === 2 && <Cpu size={20} color="var(--warning)" />}
                  {i === 3 && <Activity size={20} color="var(--error)" />}
                </motion.div>
              ))}

              {/* Connection Lines */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle cx="150" cy="150" r="140" fill="none" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="5,5" />
              </svg>
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                {selected ? `Configuring ${frameworks.find(f => f.id === selected)?.name}` : 'Select a platform'}
              </h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.5, maxWidth: '250px' }}>
                Deploy your web application to the MedLink ecosystem with a single click.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddPlatform;
