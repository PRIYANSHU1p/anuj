import { useState, useEffect } from 'react';

export const useEmotionAI = () => {
  const [distressLevel, setDistressLevel] = useState(0);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    let interval;
    if (isListening) {
      // Simulation of frequency analysis
      interval = setInterval(() => {
        const simulatedDistress = Math.floor(Math.random() * 40) + 20; // 20-60 baseline
        setDistressLevel(simulatedDistress);
      }, 2000);
    } else {
      setDistressLevel(0);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const startAnalysis = () => setIsListening(true);
  const stopAnalysis = () => setIsListening(false);

  return { distressLevel, isListening, startAnalysis, stopAnalysis };
};
