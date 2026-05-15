import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, User, LogOut, Moon, Sun, Languages } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  
  return (
    <nav className="glass-card" style={{ 
      position: 'fixed', 
      top: '1rem', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      width: 'calc(100% - 2rem)', 
      maxWidth: '1200px',
      zIndex: 1000,
      padding: '0.75rem 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
        <div style={{ padding: '0.5rem', background: 'var(--primary)', borderRadius: '12px', color: 'white' }}>
          <Heart size={24} fill="currentColor" />
        </div>
        MedLink
      </Link>
      
      <div className="desktop-menu" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ fontWeight: 500 }}>Home</Link>
        {user ? (
          <>
            <Link 
              to={
                user.role === 'patient' ? "/patient-dashboard" : 
                user.role === 'doctor' ? "/doctor-dashboard" : 
                user.role === 'authority' ? "/authority" : "/"
              } 
              style={{ fontWeight: 500 }}
            >
              {t('dashboard')}
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <div style={{ width: '32px', height: '32px', background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={18} />
                </div>
                {user.full_name}
              </div>
              <button onClick={handleLogout} style={{ color: 'var(--error)', background: 'transparent' }}><LogOut size={20} /></button>
            </div>
          </>
        ) : (
          <Link to="/login" className="glass-card glow-on-hover" style={{ padding: '0.5rem 1.25rem', background: 'var(--primary)', color: 'white', fontWeight: 600 }}>{t('login')}</Link>
        )}
        
        <div style={{ display: 'flex', gap: '0.5rem', borderLeft: '1px solid var(--border)', paddingLeft: '1rem' }}>
          {/* Language Toggle */}
          <button 
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            style={{ 
              background: 'var(--surface)', 
              border: '1px solid var(--border)', 
              padding: '0.5rem', 
              borderRadius: '10px',
              color: 'var(--text)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              fontWeight: 700
            }}
          >
            <Languages size={18} /> {lang.toUpperCase()}
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            style={{ 
              background: 'var(--surface)', 
              border: '1px solid var(--border)', 
              padding: '0.5rem', 
              borderRadius: '10px',
              color: 'var(--text)'
            }}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
