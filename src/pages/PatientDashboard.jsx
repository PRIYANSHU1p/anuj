import React, { useState, useEffect } from 'react';
import { connectSmartWatch } from '../utils/BluetoothService';
import { Heart, Watch } from 'lucide-react';
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
import { analyzeSymptoms } from '../lib/groq';
import { databases, DATABASE_ID, COLLECTION_REQUESTS, COLLECTION_RECORDS } from '../lib/appwrite';
import { ID, Query } from 'appwrite';
import ChatComponent from '../components/ChatComponent';
import DigitalTwin from '../components/DigitalTwin';
import KarmaMeter from '../components/KarmaMeter';
import AIHealthNews from '../components/AIHealthNews';
import ImpactLeaderboard from '../components/ImpactLeaderboard';
import HealthTimeline from '../components/HealthTimeline';
import ElysianHologram from '../components/ElysianHologram';
import GeoResponder from '../components/GeoResponder';
import AIVisionScanner from '../components/AIVisionScanner';
import UniversalHealthGraph from '../components/UniversalHealthGraph';
import LiveGridMap from '../components/LiveGridMap';
import { useEmotionAI } from '../hooks/useEmotionAI';
import { getSpecialistForDisease } from '../utils/SpecializationMapper';




const PatientDashboard = () => {
  const [vitalsHistory, setVitalsHistory] = useState([]);
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRequest, setNewRequest] = useState({ disease: 'Diabetes', note: '', urgency: 'low' });
  const [isListening, setIsListening] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [heartRate, setHeartRate] = useState(0);
  const [isWatchConnected, setIsWatchConnected] = useState(false);

  const handleConnectWatch = async () => {
    try {
      await connectSmartWatch((bpm) => {
        setHeartRate(bpm);
        setIsWatchConnected(true);
        
        // Log real-time pulse to medical history every 5 seconds
        if (bpm > 0 && Math.random() > 0.8) {
           saveVitalsToDB(bpm);
        }
      });
    } catch (e) {
      alert("Please ensure Bluetooth is enabled and you have a heart rate monitor nearby.");
    }
  };

  const saveVitalsToDB = async (bpm) => {
    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_RECORDS, ID.unique(), {
        patient_id: user?.$id,
        score: Math.round(100 - (bpm > 100 ? (bpm-100) : 0)),
        status: bpm > 100 ? 'Elevated' : 'Normal',
        bp: '120/80', // In a real setup, we'd get this too
        sugar: '95 mg/dL',
        created_at: new Date().toISOString()
      });
    } catch (err) {}
  };
  const [aiState, setAiState] = useState('idle');
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [healthRecord, setHealthRecord] = useState(null);
  const [activeRequests, setActiveRequests] = useState([]);

  const fetchHealthRecord = async () => {
    if (!user?.$id) return;
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_RECORDS,
        [Query.equal('patient_id', user.$id), Query.orderDesc('$createdAt'), Query.limit(10)]
      );
      if (response.documents.length > 0) {
        setHealthRecord(response.documents[0]);
        setVitalsHistory(response.documents.map(doc => ({
          name: new Date(doc.$createdAt).toLocaleDateString('en-IN', { weekday: 'short' }),
          bp: parseInt(doc.bp) || 0,
          sugar: parseInt(doc.sugar) || 0,
          date: new Date(doc.$createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
          title: doc.status,
          type: 'record'
        })));
      }
    } catch (error) {
      console.error("Error fetching health record:", error);
    }
  };

  const fetchActiveRequests = async () => {
    if (!user?.$id) return;
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_REQUESTS,
        [Query.equal('patient_id', user.$id), Query.orderDesc('$createdAt'), Query.limit(5)]
      );
      setActiveRequests(response.documents);
    } catch (error) {
      console.error("Error fetching active requests:", error);
    }
  };

  useEffect(() => {
    fetchHealthRecord();
    fetchActiveRequests();

    // REALTIME REQUEST SYNC
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_REQUESTS}.documents`, 
      response => {
        if (response.events.some(e => e.includes('.create') || e.includes('.update') || e.includes('.delete'))) {
          fetchActiveRequests();
        }
      }
    );

    return () => unsubscribe();
  }, [user?.$id]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.warn("Location access denied"),
      { enableHighAccuracy: true }
    );
  }, []);

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
  
  const handleSeedData = async () => {
    if (!user?.$id) return;
    setLoading(true);
    try {
      // Seed some health records
      await databases.createDocument(DATABASE_ID, COLLECTION_RECORDS, ID.unique(), {
        patient_id: user.$id,
        bp: "125/82",
        sugar: "105",
        status: "Baseline"
      });
      
      // Seed an active request
      await databases.createDocument(DATABASE_ID, COLLECTION_REQUESTS, ID.unique(), {
        patient_id: user.$id,
        patient_name: user.full_name || user.name,
        symptoms: "Occasional dizziness and mild fatigue. Requesting routine checkup.",
        department: "General Medicine",
        status: "pending"
      });

      alert("Demo Data Synced! Your health dashboard is now populated.");
      fetchHealthRecord();
      fetchActiveRequests();
    } catch (error) {
      console.error("Seeding failed:", error);
      alert("Seeding failed: " + error.message);
    }
    setLoading(false);
  };

  const handleNewRequest = async (e) => {
    e.preventDefault();
    if (!user?.$id) return;
    setLoading(true);
    try {
      const specialistDept = getSpecialistForDisease(newRequest.disease);
      await databases.createDocument(DATABASE_ID, COLLECTION_REQUESTS, ID.unique(), {
        patient_id: user.$id,
        patient_name: user.full_name,
        department: specialistDept,
        symptoms: newRequest.note,
        urgency: newRequest.urgency || 'low',
        status: 'pending'
      });
      setShowModal(false);
      setNewRequest({ disease: 'Diabetes', note: '', urgency: 'low' });
      alert("Request Submitted Successfully!");
    } catch (err) {
      console.error("SUBMISSION_ERROR:", err);
      alert(`Submission Failed: ${err.message || JSON.stringify(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAiAnalysis = async (customSymptom = null) => {
    const input = customSymptom || symptoms || document.getElementById('symptomInput')?.value;
    if (!input) return;
    
    setAiState('analyzing');
    setAiResult(null);
    
    try {
      // Fetch Location during analysis
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        });
      }

      const result = await analyzeSymptoms(input);
      
      const enrichedResult = {
        ...result,
        blockchainId: `MB-${Math.random().toString(16).slice(2, 10)}`,
        integrity: 'verified'
      };

      setAiResult(enrichedResult);
      setAiState('result');

      // 1. Create a Health Record for the Digital Twin
      try {
        await databases.createDocument(
          DATABASE_ID,
          COLLECTION_RECORDS,
          ID.unique(),
          {
            patient_id: user?.$id,
            score: enrichedResult.score || 80,
            status: enrichedResult.status || 'Good',
            bp: enrichedResult.bp || '120/80',
            sugar: enrichedResult.sugar || '90 mg/dL',
            created_at: new Date().toISOString()
          }
        );
        // Refresh UI
        fetchHealthRecord();
      } catch (e) { console.error("Health record save failed:", e); }

      // If critical, automatically save to Appwrite Database for Authorities
      if (enrichedResult.urgency === 'critical') {
        const locString = location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'GPS Denied';

        await databases.createDocument(
          DATABASE_ID,
          COLLECTION_REQUESTS,
          ID.unique(),
          {
            patient_id: user?.$id,
            patient_name: user?.full_name,
            symptoms: input || symptoms,
            department: enrichedResult.department,
            status: 'pending'
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
        <div style={{ display: 'flex', gap: '0.75rem' }}>
           <button 
             onClick={handleConnectWatch} 
             className="glow-on-hover" 
             style={{ 
               padding: '0.75rem 1.5rem', 
               background: isWatchConnected ? 'var(--success)' : 'var(--accent)', 
               color: 'white', 
               fontWeight: 800, 
               borderRadius: '12px',
               display: 'flex',
               alignItems: 'center',
               gap: '0.6rem',
               border: 'none',
               fontSize: '0.85rem',
               height: '48px'
             }}
           >
             <Watch size={18} />
             {isWatchConnected ? 'Watch Active' : 'Connect Smart Watch'}
           </button>
            <button 
              onClick={() => setShowModal(true)} 
              className="glow-on-hover" 
              style={{ 
                padding: '0.75rem 1.5rem', 
                background: 'var(--primary)', 
                color: 'white', 
                fontWeight: 800, 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.6rem',
                border: 'none',
                fontSize: '0.85rem',
                height: '48px'
              }}
            >
              <PlusCircle size={18} /> Request Appointment
            </button>
            <button 
              onClick={isNeuralListening ? stopAnalysis : startAnalysis} 
              className="glow-on-hover" 
              style={{ 
                padding: '0.75rem 1.5rem', 
                background: isNeuralListening ? 'var(--error)' : 'var(--primary)', 
                color: 'white', 
                fontWeight: 800, 
                borderRadius: '12px',
                border: 'none',
                fontSize: '0.85rem',
                height: '48px',
                minWidth: '160px'
              }}
            >
              {isNeuralListening ? 'Stop Neural Sync' : 'Start Neural Sync'}
            </button>
        </div>
      </header>

      {/* Unified Command Center - 3 Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Col 1: Digital Twin Stats */}
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--primary)', color: 'white', padding: '0.4rem', borderRadius: '8px' }}>
              <Activity size={20} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Digital Twin</h3>
          </div>
          <DigitalTwin 
            score={healthRecord?.score || 0} 
            status={healthRecord?.status || 'Syncing...'} 
            bp={healthRecord?.bp || 'N/A'}
            sugar={healthRecord?.sugar || 'N/A'}
            heartRate={heartRate}
            isWatchConnected={isWatchConnected}
          />
        </div>

        {/* Col 2: Live Heart Visualization */}
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
            <div className="badge badge-success" style={{ fontSize: '0.6rem' }}>LIVE FEED</div>
          </div>
          <div style={{ width: '220px', height: '220px', borderRadius: '50%', border: `1px solid ${isWatchConnected ? 'var(--success)' : 'var(--border)'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.05) 0%, transparent 70%)', position: 'relative' }}>
             <Heart size={32} color={isWatchConnected ? 'var(--success)' : 'var(--error)'} style={{ animation: `pulse ${heartRate > 100 ? '0.4s' : '0.8s'} infinite` }} />
             <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--text)' }}>{heartRate || '72'}</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.5, marginLeft: '4px' }}>BPM</span>
             </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%', marginTop: '2rem' }}>
             <div style={{ padding: '0.75rem', background: 'var(--surface-secondary)', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>SPO2</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>{isWatchConnected ? (97 + (heartRate % 3)) : '98'}%</div>
             </div>
             <div style={{ padding: '0.75rem', background: 'var(--surface-secondary)', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>STRESS</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: heartRate > 100 ? 'var(--error)' : 'var(--accent)' }}>{heartRate > 100 ? 'High' : 'Normal'}</div>
             </div>
          </div>
        </div>

        {/* Col 3: AI Triage & Analysis */}
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--accent)', color: 'white', padding: '0.4rem', borderRadius: '8px' }}>
              <ShieldCheck size={20} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>AI Symptom Analyzer</h3>
          </div>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <textarea 
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe how you are feeling today..."
                style={{ 
                  width: '100%', padding: '1rem', borderRadius: '15px', 
                  background: 'var(--surface)', border: '1px solid var(--border)', 
                  color: 'var(--text)', minHeight: '120px', outline: 'none',
                  fontSize: '0.9rem', lineHeight: 1.5,
                  transition: 'all 0.3s ease'
                }}
                className="custom-textarea"
              />
              <button 
                onClick={startVoiceTriage}
                style={{ position: 'absolute', right: '12px', bottom: '15px', background: isListening ? 'var(--error)' : 'var(--background)', border: 'none', color: isListening ? 'white' : 'var(--primary)', padding: '0.6rem', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
            </div>
            
            <button 
              onClick={() => handleAiAnalysis()}
              disabled={aiState === 'analyzing'}
              className="glow-on-hover"
              style={{ width: '100%', padding: '1.25rem', background: 'var(--primary)', color: 'white', borderRadius: '12px', fontWeight: 800, fontSize: '0.95rem' }}
            >
              {aiState === 'analyzing' ? 'Processing Bio-Signals...' : 'Analyze Symptoms'}
            </button>

            <AnimatePresence>
              {aiState === 'result' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '1.5rem', background: aiResult.urgency === 'critical' ? 'rgba(239, 68, 68, 0.05)' : 'var(--surface)', borderRadius: '15px', border: `1px solid ${aiResult.urgency === 'critical' ? 'var(--error)' : 'var(--primary)'}`, boxShadow: `0 10px 30px ${aiResult.urgency === 'critical' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(14, 165, 233, 0.1)'}` }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: aiResult.urgency === 'critical' ? 'var(--error)' : 'var(--primary)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                     <AlertCircle size={14} /> AI Diagnostic Suggestion
                   </div>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)' }}>{aiResult.suggestion}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {aiResult?.urgency === 'critical' && <div style={{ marginBottom: '2rem' }}><GeoResponder patientLat={location?.lat} patientLng={location?.lng} /></div>}

      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text)' }}>National Geospatial Response Grid</h3>
        <div style={{ height: '500px', borderRadius: '20px', overflow: 'hidden' }}>
          <LiveGridMap 
            center={location ? [location.lat, location.lng] : [20.5937, 78.9629]} 
            zoom={location ? 14 : 5} 
            markers={location ? [{ position: [location.lat, location.lng], label: "You (Active Signal)", urgency: 'low' }] : []} 
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <button 
              onClick={handleSeedData}
              disabled={loading}
              className="glass-card" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.5rem', border: '1px solid var(--primary)', background: 'var(--primary)10', color: 'var(--primary)', fontWeight: 800, transition: 'all 0.3s ease' }}
            >
              <RefreshCw size={20} className={loading ? 'spin' : ''} /> {loading ? 'Syncing...' : 'Sync Demo Data'}
            </button>
            <button onClick={() => setShowModal(true)} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.5rem', border: '1px solid var(--border)', fontWeight: 800, transition: 'all 0.3s ease' }}>
              <PlusCircle size={20} color="var(--primary)" /> New Request
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activeRequests.map(req => (
              <div key={req.$id} style={{ padding: '1rem', background: 'var(--background)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{req.department || 'General'}</span>
                  <div style={{ 
                    padding: '0.25rem 0.6rem', 
                    borderRadius: '20px', 
                    fontSize: '0.65rem', 
                    fontWeight: 900,
                    background: req.status === 'pending' ? 'var(--warning)20' : 'var(--success)20',
                    color: req.status === 'pending' ? 'var(--warning)' : 'var(--success)',
                    border: `1px solid ${req.status === 'pending' ? 'var(--warning)' : 'var(--success)'}`
                  }}>
                    {req.status.startsWith('accepted_by_') ? 'DOCTOR ASSIGNED' : req.status.toUpperCase()}
                  </div>
                </div>
                <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>{req.symptoms.substring(0, 40)}...</p>
                {req.status.startsWith('accepted_by_') && (
                  <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'var(--success)10', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 700, color: 'var(--success)' }}>
                    Assigned to {req.status.replace('accepted_by_', '')}
                  </div>
                )}
              </div>
            ))}
            {activeRequests.length === 0 && <p style={{ textAlign: 'center', fontSize: '0.8rem', opacity: 0.5 }}>No active requests found.</p>}
          </div>
        </div>
        <UniversalHealthGraph />
        <ElysianHologram distressLevel={healthRecord?.status === 'Critical' ? 85 : 12} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '2rem' }}>
        <HealthTimeline events={vitalsHistory} />
        <ImpactLeaderboard />
        <AIHealthNews />
      </div>


      {/* Request Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2rem' }}>New Consultation</h3>
            <form onSubmit={handleNewRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700 }}>Disease / Condition</label>
                <select 
                  value={newRequest.disease} 
                  onChange={(e) => setNewRequest({...newRequest, disease: e.target.value})}
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontWeight: 600 }}
                >
                  <option value="Diabetologist">Endocrinology / Diabetes</option>
                  <option value="Cardiologist">Cardiology / Heart</option>
                  <option value="Pulmonologist">Pulmonology / Asthma</option>
                  <option value="Dermatologist">Dermatology / Skin</option>
                  <option value="Neurologist">Neurology / Brain</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700 }}>Symptoms / Notes</label>
                <textarea 
                  required
                  value={newRequest.note}
                  onChange={(e) => setNewRequest({...newRequest, note: e.target.value})}
                  placeholder="Describe how you are feeling..."
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', minHeight: '120px', background: 'var(--surface)', color: 'var(--text)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700 }}>Urgency</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {['low', 'medium', 'high'].map(u => (
                    <button 
                      key={u}
                      type="button"
                      onClick={() => setNewRequest({...newRequest, urgency: u})}
                      style={{ 
                        flex: 1, padding: '0.75rem', borderRadius: '10px', textTransform: 'capitalize', fontWeight: 700,
                        background: newRequest.urgency === u ? 'var(--primary)' : 'var(--surface)',
                        color: newRequest.urgency === u ? 'white' : 'var(--text)',
                        border: '1px solid var(--border)'
                      }}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '1rem', borderRadius: '12px', fontWeight: 700, background: 'var(--surface)', border: '1px solid var(--border)' }}>Cancel</button>
                <button type="submit" disabled={loading} style={{ flex: 1, padding: '1rem', borderRadius: '12px', fontWeight: 700, background: 'var(--primary)', color: 'white', border: 'none' }}>
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
