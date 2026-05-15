import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AuthorityDashboard from './pages/AuthorityDashboard';
import { useAuth } from './context/AuthContext';
import SOSButton from './components/SOSButton';
import ConnectivityMonitor from './components/ConnectivityMonitor';
import { client } from './lib/appwrite';

const Notification = ({ message, type = 'info', onClose }) => (

  <motion.div 
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 300, opacity: 0 }}
    style={{
      position: 'fixed',
      top: '2rem',
      right: '2rem',
      padding: '1rem 2rem',
      background: type === 'error' ? 'var(--error)' : 'var(--primary)',
      color: 'white',
      borderRadius: '12px',
      zIndex: 5000,
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}
  >
    {message}
  </motion.div>
);

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loader"></div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/" />;
  return children;
};

function App() {
  const { user, loading } = useAuth();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (loading) {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: '80px', height: '80px', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(20px)' }}
        />
        <h2 style={{ marginTop: '2rem', fontWeight: 900, letterSpacing: '2px', opacity: 0.5 }}>MEDLINK OS</h2>
        <p style={{ fontSize: '0.8rem', opacity: 0.3, marginTop: '0.5rem' }}>Initializing National Health Grid...</p>
      </div>
    );
  }


  return (
    <Router>
      <div className="app">
        <ConnectivityMonitor />
        <Navbar />
        {user?.role === 'patient' && <SOSButton />}

        <AnimatePresence>
          {notification && (
            <Notification 
              message={notification.message} 
              type={notification.type} 
              onClose={() => setNotification(null)} 
            />
          )}
        </AnimatePresence>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={
            user ? (
              user.role === 'patient' ? <Navigate to="/patient-dashboard" /> : 
              user.role === 'doctor' ? <Navigate to="/doctor-dashboard" /> : 
              user.role === 'authority' ? <Navigate to="/authority" /> : 
              <Navigate to="/" />
            ) : <Login />
          } />

          <Route path="/patient-dashboard" element={<ProtectedRoute allowedRole="patient"><PatientDashboard /></ProtectedRoute>} />
          <Route path="/doctor-dashboard" element={<ProtectedRoute allowedRole="doctor"><DoctorDashboard /></ProtectedRoute>} />
          <Route path="/authority" element={<ProtectedRoute allowedRole="authority"><AuthorityDashboard /></ProtectedRoute>} />
          
          <Route path="/patient" element={<Navigate to="/patient-dashboard" />} />
          <Route path="/doctor" element={<Navigate to="/doctor-dashboard" />} />
        </Routes>
      </div>
    </Router>
  );


}

export default App;
