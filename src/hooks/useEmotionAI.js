import { useState, useEffect, useRef } from 'react';

export const useEmotionAI = () => {
  const [distressLevel, setDistressLevel] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);

  const startAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      setIsListening(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
      setIsListening(false);
    }
  };

  const stopAnalysis = () => {
    setIsListening(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  useEffect(() => {
    let animationFrame;
    if (isListening && analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      const update = () => {
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        // Map average volume (0-128 usually) to distress level (0-100)
        setDistressLevel(Math.min(Math.round(average * 1.5), 100));
        animationFrame = requestAnimationFrame(update);
      };
      update();
    } else {
      setDistressLevel(0);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isListening]);

  return { distressLevel, isListening, startAnalysis, stopAnalysis };
};
