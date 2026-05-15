import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Zap, Globe, Heart, ChevronRight, Activity, Users, Star, 
  ArrowRight, Smartphone, Microscope, Clock, ShieldCheck, MapPin,
  Sparkles, Navigation, Mic, Map as MapIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="home-container" style={{ overflowX: 'hidden' }}>
      {/* Dynamic Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 10% 10%, rgba(14, 165, 233, 0.05) 0%, transparent 50%), radial-gradient(circle at 90% 90%, rgba(244, 63, 94, 0.05) 0%, transparent 50%)', zIndex: -1 }}></div>

      {/* Hero Section */}
      <header className="hero" style={{ paddingTop: '12rem', paddingBottom: '8rem', position: 'relative' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="badge badge-primary" style={{ marginBottom: '1.5rem', padding: '0.6rem 1.5rem', fontSize: '1rem', background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary-dark)', border: '1px solid var(--primary-light)' }}>
              🇮🇳 Building Bharat's Digital Health Backbone
            </div>
            <h1 style={{ fontSize: '5rem', lineHeight: 1, fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.03em' }}>
              Revolutionizing <br/>
              <span className="text-gradient">Indian Healthcare</span> <br/>
              Through AI.
            </h1>
            <p style={{ fontSize: '1.4rem', color: 'var(--text-muted)', marginBottom: '3.5rem', lineHeight: 1.6, maxWidth: '600px' }}>
              MedLink is a production-ready medical ecosystem that solves **Doctor Burnout** and **Emergency Prioritization** using AI-driven Smart Triage.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link to="/login" className="glow-on-hover" style={{ padding: '1.5rem 3rem', background: 'var(--primary)', color: 'white', borderRadius: '20px', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 20px 40px rgba(14, 165, 233, 0.3)' }}>
                Start Now <ArrowRight size={24} />
              </Link>
              <button style={{ padding: '1.5rem 3rem', background: 'white', border: '2px solid var(--border)', borderRadius: '20px', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text)' }}>
                View Project Deck
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ position: 'relative' }}
          >
            <div className="glass-card" style={{ padding: '3rem', position: 'relative', zIndex: 2, background: 'rgba(255, 255, 255, 0.7)', border: '1px solid white', boxShadow: '0 40px 100px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ width: '64px', height: '64px', background: 'var(--primary)', color: 'white', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Activity size={32} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>AI Smart Triage</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Urgency Sorting Active</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ height: '12px', width: '100%', background: 'var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 2 }} style={{ height: '100%', background: 'var(--primary)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)' }}>
                  <span>Accuracy: 98.4%</span>
                  <span>Responses: &lt; 2s</span>
                </div>
              </div>
              <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', color: '#15803d', borderRadius: '15px', textAlign: 'center', fontWeight: 700 }}>
                  Hindi Live
                </div>
                <div style={{ padding: '1rem', background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary-dark)', borderRadius: '15px', textAlign: 'center', fontWeight: 700 }}>
                  ABHA Sync
                </div>
              </div>
            </div>
            {/* Floating Orbs */}
            <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '150px', height: '150px', background: 'var(--accent)', borderRadius: '50%', filter: 'blur(60px)', opacity: 0.2, zIndex: 1 }}></div>
            <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '200px', height: '200px', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.15, zIndex: 1 }}></div>
          </motion.div>
        </div>
      </header>

      {/* Winning Feature Showcase */}
      <section style={{ padding: '10rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: 900 }}>The <span className="text-gradient">Innovation</span> Stack.</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.5rem', maxWidth: '800px', margin: '1rem auto' }}>
              Advanced technology solving real-world Indian medical problems.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {[
              { title: 'AI Clinical Impression', desc: 'Auto-distills complex histories into a 30-second brief for doctors.', icon: <Sparkles />, color: '#0ea5e9' },
              { title: 'Medical Blockchain', desc: '100% immutable and tamper-proof medical record ledger for trust.', icon: <ShieldCheck />, color: '#22c55e' },
              { title: 'Geo-Spatial SOS', desc: 'PostGIS-powered routing to the nearest level-1 emergency responder.', icon: <Navigation />, color: '#ef4444' },
              { title: 'Vocal AI Triage', desc: 'Voice-to-Service interface for seamless accessibility in rural areas.', icon: <Mic />, color: '#8b5cf6' },
              { title: 'National Heatmaps', desc: 'Predictive outbreak surveillance for health authorities and cities.', icon: <MapIcon />, color: '#f59e0b' },
              { title: 'Life-Long Timeline', desc: 'A beautiful interactive story of your medical history over decades.', icon: <Clock />, color: '#ec4899' }
            ].map((feat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="glass-card" 
                style={{ padding: '3rem', border: `1px solid ${feat.color}20`, background: 'rgba(255,255,255,0.5)' }}
              >
                <div style={{ color: feat.color, marginBottom: '2rem', background: `${feat.color}10`, width: 'fit-content', padding: '1.25rem', borderRadius: '20px' }}>
                  {React.cloneElement(feat.icon, { size: 40 })}
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.25rem' }}>{feat.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '1.1rem' }}>{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solving The Problem Section */}
      <section style={{ padding: '10rem 0', background: 'var(--surface)', position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.02em' }}>The Indian Medical Crisis <br/> <span style={{ color: 'var(--error)' }}>Solved.</span></h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
                India has one doctor for every 1,457 people. Our technology ensures that not a single second of a doctor's time is wasted on non-critical administrative tasks.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { title: "Zero Paperwork", desc: "Digital prescriptions and ABHA sync eliminate manual entries." },
                  { title: "Smart Prioritization", desc: "AI sorts emergencies so doctors focus on saving lives first." },
                  { title: "Rural Accessibility", desc: "Full Hindi support and low-bandwidth chat for Tier 2/3 cities." }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1.5rem' }}>
                    <div style={{ color: 'var(--primary)' }}><ShieldCheck size={28} /></div>
                    <div>
                      <h4 style={{ fontWeight: 800, fontSize: '1.2rem' }}>{item.title}</h4>
                      <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {[
                { icon: <Zap />, title: "Triage AI", color: "#0ea5e9" },
                { icon: <Globe />, title: "I18n Engine", color: "#f43f5e" },
                { icon: <Smartphone />, title: "Mobile Ready", color: "#8b5cf6" },
                { icon: <Microscope />, title: "Diagnostics", color: "#10b981" }
              ].map((card, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -15, boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}
                  className="glass-card" 
                  style={{ padding: '2.5rem', textAlign: 'center', background: 'white' }}
                >
                  <div style={{ color: card.color, marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                    {React.cloneElement(card.icon, { size: 48 })}
                  </div>
                  <h4 style={{ fontWeight: 800 }}>{card.title}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Stats */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '4rem' }}>National Impact Metrics</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {[
              { label: 'Time Saved per Doc', value: '4.5 Hrs/Day' },
              { label: 'Triage Accuracy', value: '98.9%' },
              { label: 'Response Time', value: '< 3 Min' },
              { label: 'Digital Records', value: '100%' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>{stat.value}</div>
                <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '10rem 0' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '6rem 4rem', background: 'var(--primary)', color: 'white', textAlign: 'center', borderRadius: '40px', position: 'relative', overflow: 'hidden' }}>
             <div style={{ position: 'absolute', inset: 0, background: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")', opacity: 0.1 }}></div>
             <h2 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '2rem', position: 'relative' }}>Join Bharat's Health Revolution.</h2>
             <p style={{ fontSize: '1.5rem', opacity: 0.9, marginBottom: '4rem', position: 'relative', maxWidth: '800px', margin: '0 auto 4rem' }}>
               Built by engineers who care about India. Deploy MedLink in your hospital today.
             </p>
             <div style={{ position: 'relative' }}>
               <Link to="/login" style={{ padding: '1.5rem 5rem', background: 'white', color: 'var(--primary)', borderRadius: '24px', fontWeight: 900, fontSize: '1.3rem', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>Register Hospital</Link>
             </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: '4rem 0', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem', opacity: 0.6 }}>
           <Link to="/">Terms</Link>
           <Link to="/">Privacy</Link>
           <Link to="/">API</Link>
        </div>
        <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>© 2026 MedLink India. National Hackathon Candidate.</p>
      </footer>
    </div>
  );
};

export default Home;
