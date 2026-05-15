import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User as UserIcon, Shield, ChevronRight, Building2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, signUp } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('patient');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

   const [formData, setFormData] = useState({
     email: '',
     password: '',
     full_name: '',
     license_number: '',
     abha_id: ''
   });
  
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isRegister) {
         let finalAbha = formData.abha_id;
         let finalLicense = formData.license_number;

         if (role === 'patient' && !finalAbha) {
           finalAbha = `ML-${Math.floor(100000 + Math.random() * 900000)}`;
         }
         if (role === 'doctor' && !finalLicense) {
           finalLicense = `DOC-${Math.floor(100000 + Math.random() * 900000)}`;
         }

         await signUp(formData.email, formData.password, {
           full_name: formData.full_name,
           role: role,
           license_number: role === 'doctor' ? finalLicense : null,
           abha_id: role === 'patient' ? finalAbha : null
         });
        setSuccess(true);
        setTimeout(() => {
          setIsRegister(false);
          setSuccess(false);
        }, 3000);
      } else {
        await login(formData.email, formData.password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const roleConfigs = {
    patient: { label: 'Patient', icon: <UserIcon size={18} />, color: 'var(--primary)' },
    doctor: { label: 'Doctor', icon: <Shield size={18} />, color: 'var(--accent)' },
    authority: { label: 'Authority', icon: <Building2 size={18} />, color: '#8b5cf6' }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 0' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card" 
        style={{ width: '100%', maxWidth: '500px', padding: '4rem 3rem', position: 'relative', overflow: 'hidden' }}
      >
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{ textAlign: 'center', padding: '2rem 0' }}
            >
              <div style={{ background: '#22c55e20', color: '#22c55e', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                <CheckCircle2 size={48} />
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>Account Created!</h2>
              <p style={{ color: 'var(--text-muted)' }}>Redirecting you to login...</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 900 }}>
                  {isRegister ? 'Join' : 'Welcome to'} <span className="text-gradient">MedLink</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Infinity Healthcare OS for India.</p>
              </div>

              {error && (
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 700, border: '1px solid var(--error)' }}>
                  {error}
                </motion.div>
              )}
              
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', background: 'var(--background)', padding: '0.4rem', borderRadius: '15px', border: '1px solid var(--border)' }}>
                {Object.entries(roleConfigs).map(([key, config]) => (
                  <button 
                    key={key}
                    type="button"
                    onClick={() => setRole(key)}
                    style={{ 
                      flex: 1, 
                      padding: '0.75rem 0.5rem', 
                      borderRadius: '10px', 
                      background: role === key ? config.color : 'transparent', 
                      color: role === key ? 'white' : 'var(--text-muted)', 
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {config.icon} {config.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <AnimatePresence>
                  {isRegister && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)' }}>FULL NAME</label>
                        <div style={{ position: 'relative' }}>
                          <UserIcon size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="John Doe" style={{ width: '100%', paddingLeft: '3rem' }} required />
                        </div>
                      </div>

                      {role === 'doctor' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)' }}>MEDICAL LICENSE NUMBER</label>
                          <div style={{ position: 'relative' }}>
                            <Shield size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input type="text" name="license_number" value={formData.license_number} onChange={handleChange} placeholder="MCI-123456 (Optional)" style={{ width: '100%', paddingLeft: '3rem' }} />
                          </div>
                        </div>
                      )}

                      {role === 'patient' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)' }}>ABHA ID (NATIONAL HEALTH ID)</label>
                          <div style={{ position: 'relative' }}>
                            <Shield size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input type="text" name="abha_id" value={formData.abha_id} onChange={handleChange} placeholder="12-3456-7890-1234 (Optional)" style={{ width: '100%', paddingLeft: '3rem' }} />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)' }}>EMAIL ADDRESS</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@medlink.in" style={{ width: '100%', paddingLeft: '3rem' }} required />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)' }}>PASSWORD</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" style={{ width: '100%', paddingLeft: '3rem' }} required />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="glow-on-hover"
                  style={{ 
                    padding: '1.25rem', 
                    background: roleConfigs[role].color, 
                    color: 'white', 
                    borderRadius: '15px', 
                    fontWeight: 800, 
                    marginTop: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    fontSize: '1rem',
                    opacity: loading ? 0.7 : 1,
                    boxShadow: `0 10px 20px rgba(0,0,0,0.1)`
                  }}
                >
                  {loading ? 'Processing...' : (isRegister ? `Register as ${roleConfigs[role].label}` : 'Access Infrastructure')} <ChevronRight size={20} />
                </button>

                <button 
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  style={{ background: 'transparent', color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 700, marginTop: '1rem' }}
                >
                  {isRegister ? 'Back to Login' : `Need a ${role} account? Register Now`}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;

