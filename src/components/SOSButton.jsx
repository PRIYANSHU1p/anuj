import React from 'react';
import { PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

const SOSButton = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => window.open('tel:102')}
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        width: '64px',
        height: '64px',
        background: '#ef4444',
        color: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4)',
        zIndex: 4500,
        border: '4px solid white'
      }}
    >
      <PhoneCall size={28} />
      <div style={{ position: 'absolute', top: '-5px', right: '-5px', width: '20px', height: '20px', background: 'white', borderRadius: '50%', border: '3px solid #ef4444', animation: 'ping 1s infinite' }}></div>
      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </motion.button>
  );
};

export default SOSButton;
