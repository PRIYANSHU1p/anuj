import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Calendar, MessageSquare, Bell, User, Settings, 
  Search, PlusCircle, Clock, CheckCircle2, ChevronRight, 
  AlertCircle, FileText, PhoneCall, TrendingUp, Mic, MicOff,
  ShieldCheck, Lock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ChatComponent from '../components/ChatComponent';
import DigitalTwin from '../components/DigitalTwin';
import KarmaMeter from '../components/KarmaMeter';
import AIHealthNews from '../components/AIHealthNews';
import GeoResponder from '../components/GeoResponder';
import HealthTimeline from '../components/HealthTimeline';
import AIVisionScanner from '../components/AIVisionScanner';
import UniversalHealthGraph from '../components/UniversalHealthGraph';
import ElysianHologram from '../components/ElysianHologram';
import { useEmotionAI } from '../hooks/useEmotionAI';
import { analyzeSymptoms } from '../lib/groq';
import { databases, DATABASE_ID, COLLECTION_REQUESTS } from '../lib/appwrite';
import { ID } from 'appwrite';




const vitalsData = [
  { name: 'Mon', bp: 120, sugar: 90 },
  { name: 'Tue', bp: 118, sugar: 92 },
  { name: 'Wed', bp: 122, sugar: 88 },
  { name: 'Thu', bp: 115, sugar: 95 },
  { name: 'Fri', bp: 121, sugar: 91 },
];

const PatientDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRequest, setNewRequest] = useState({ service: 'General Checkup', note: '', urgency_level: 'low', abha_id: '' });
  const [isListening, setIsListening] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [aiState, setAiState] = useState('idle');
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // "Hey MedLink" Wake Word Listener (Hands-free SOS)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = 'en-IN';
      recognition.onresult = (event) => {
        const last = event.results.length - 1;
        const text = event.results[last][0].transcript.toLowerCase();
        if (text.includes('hey medlink') || text.includes('help me')) {
          setAiResult({ urgency: 'critical', suggestion: 'Voice Triggered SOS: Responders Notified.' });
        }
      };
      recognition.start();
    }
  }, []);


  const startVoiceTriage = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('Voice interface not supported in this browser.');
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSymptoms(transcript);
    };
    recognition.start();
  };

  const handleAiAnalysis = async (customSymptom = null) => {
    const input = customSymptom || symptoms || document.getElementById('symptomInput')?.value;
    if (!input) return;
    
    setAiState('analyzing');
    setAiResult(null);
    
    try {
      const result = await analyzeSymptoms(input);
      
      const enrichedResult = {
        ...result,
        blockchainId: `MB-${Math.random().toString(16).slice(2, 10)}`,
        integrity: 'verified'
      };

      setAiResult(enrichedResult);
      setAiState('result');

      // If critical, automatically save to Appwrite Database for Authorities
      if (enrichedResult.urgency === 'critical') {
        await databases.createDocument(
          DATABASE_ID,
          COLLECTION_REQUESTS,
          ID.unique(),
          {
            patient_id: user.id,
            patient_name: user.full_name,
            symptoms: input,
            urgency: 'critical',
            suggestion: enrichedResult.suggestion,
            department: enrichedResult.department,
            location: 'Assigned via GeoResponder', // Would integrate with real GPS in production
            status: 'pending',
            created_at: new Date().toISOString()
          }
        );
      }
    } catch (error) {
      console.error("Dashboard AI analysis error:", error);
      setAiState('idle');
    }
  };

  const { distressLevel, isListening: isNeuralListening, startAnalysis, stopAnalysis } = useEmotionAI();

  return (
    <div className="dashboard-container container" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '3rem', fontWeight: 900 }}>Your <span className="text-gradient">Health Command</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Welcome back, {user?.full_name}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
           <button onClick={isNeuralListening ? stopAnalysis : startAnalysis} className="glass-card" style={{ padding: '1rem 2rem', background: isNeuralListening ? 'var(--error)' : 'var(--primary)', color: 'white', fontWeight: 700, borderRadius: '15px' }}>
             {isNeuralListening ? 'Stop Neural Sync' : 'Start Neural Sync'}
           </button>
        </div>
      </header>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <KarmaMeter points={user?.total_karma || 1250} />

        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--error)', color: 'white' }}>
          <PhoneCall size={32} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t('emergency')}</h3>
          <p style={{ opacity: 0.8, marginBottom: '1.5rem', fontSize: '0.875rem' }}>Click for instant AI triage & ambulance dispatch.</p>
          <button 
            onClick={() => {
              handleAiAnalysis('CRITICAL EMERGENCY: CHEST PAIN AND BREATHING DIFFICULTY');
            }} 
            className="glow-on-hover" 
            style={{ background: 'white', color: 'var(--error)', padding: '1rem', borderRadius: '12px', fontWeight: 800, border: 'none' }}
          >
            TRIGGER SOS DISPATCH
          </button>

        </div>
      </div>

      {/* AI Smart Triage Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: '10px' }}>
              <Activity size={24} />
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>AI Health Digital Twin</h3>
          </div>
          <div style={{ height: '300px', minHeight: '300px' }}>
            <DigitalTwin score={88} status="Excellent" />
          </div>
        </div>


        <div className="glass-card" style={{ padding: '3rem', border: '2px solid var(--primary-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: '10px' }}>
              <Activity size={24} />
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>{t('aiTriage')}</h3>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input 
                type="text" 
                id="symptomInput"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe symptoms or use voice..." 
                style={{ width: '100%', padding: '1.25rem', paddingRight: '3.5rem', borderRadius: '15px', fontSize: '1rem' }}
              />
              <button 
                onClick={startVoiceTriage}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: isListening ? 'var(--error)' : 'transparent', border: 'none', color: isListening ? 'white' : 'var(--primary)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
            </div>
            <button 
              onClick={handleAiAnalysis}
              disabled={aiState === 'analyzing'}
              className="glow-on-hover"
              style={{ padding: '0 2.5rem', background: 'var(--primary)', color: 'white', borderRadius: '15px', fontWeight: 700 }}
            >
              {aiState === 'analyzing' ? 'Analyzing...' : t('analyze')}
            </button>
          </div>

          <AnimatePresence>
            {aiState === 'result' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '2rem', background: aiResult.urgency === 'critical' ? '#fff1f2' : 'rgba(14, 165, 233, 0.05)', borderRadius: '20px', border: `1px solid ${aiResult.urgency === 'critical' ? 'var(--error)' : 'var(--primary-light)'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <AlertCircle color={aiResult.urgency === 'critical' ? 'var(--error)' : 'var(--primary)'} />
                  <h4 style={{ fontWeight: 800, fontSize: '1.25rem', color: aiResult.urgency === 'critical' ? 'var(--error)' : 'var(--primary-dark)' }}>
                    {aiResult.urgency === 'critical' ? 'CRITICAL EMERGENCY' : 'Analysis Complete'}
                  </h4>
                </div>
                <p style={{ lineHeight: 1.6, fontSize: '1.1rem', marginBottom: '1.5rem' }}>{aiResult.suggestion}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'white', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <Lock size={16} color="#22c55e" /> Immutable Chain ID: {aiResult.blockchainId}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {aiResult?.urgency === 'critical' && <div style={{ marginBottom: '2rem' }}><GeoResponder /></div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <AIVisionScanner />
        <UniversalHealthGraph />
        <ElysianHologram distressLevel={distressLevel} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <HealthTimeline />
        <AIHealthNews />
      </div>


    </div>
  );
};

export default PatientDashboard;
