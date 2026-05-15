import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi, AlertTriangle } from 'lucide-react';

const ConnectivityMonitor = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {(!isOnline || showStatus) && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            background: isOnline ? '#22c55e' : '#ef4444',
            color: 'white',
            padding: '0.75rem',
            textAlign: 'center',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            fontWeight: 800,
            fontSize: '0.9rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          {isOnline ? (
            <><Wifi size={20} /> Back Online. Syncing Health Data...</>
          ) : (
            <><WifiOff size={20} /> Offline Mode Active. Local Emergency Mesh Engaged. <AlertTriangle size={16} /></>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConnectivityMonitor;
