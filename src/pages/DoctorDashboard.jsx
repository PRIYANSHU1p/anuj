import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, TrendingUp, DollarSign, Clock, Users, CheckCircle2, ChevronRight, Map as MapIcon, ShieldCheck, AlertTriangle, FileText, Send, Plus, Trash2, MessageSquare, X, Phone } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { databases, DATABASE_ID, COLLECTION_REQUESTS, client } from '../lib/appwrite';
import { Query } from 'appwrite';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ChatComponent from '../components/ChatComponent';
import ImpactLeaderboard from '../components/ImpactLeaderboard';
import ClinicalBrief from '../components/ClinicalBrief';
import LiveGridMap from '../components/LiveGridMap';
import { checkInteractions } from '../utils/DrugInteractionEngine';


const earningsData = [
  { day: 'Mon', amount: 2400 },
  { day: 'Tue', amount: 3100 },
  { day: 'Wed', amount: 1900 },
  { day: 'Thu', amount: 4500 },
  { day: 'Fri', amount: 3800 },
  { day: 'Sat', amount: 5200 },
  { day: 'Sun', amount: 4800 },
];

const DoctorDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  
  const [prescription, setPrescription] = useState({
    diagnosis: '',
    medicines: [{ name: '', dosage: '', duration: '' }],
    advice: ''
  });

  useEffect(() => {
    fetchRequests();

    // LIVE GRID SYNC
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_REQUESTS}.documents`, 
      response => {
        if (response.events.includes('databases.*.collections.*.documents.*.create')) {
          fetchRequests();
        }
        if (response.events.includes('databases.*.collections.*.documents.*.update')) {
          fetchRequests();
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID, 
        COLLECTION_REQUESTS,
        [
          Query.orderDesc('$createdAt'),
          Query.limit(20)
        ]
      );
      
      // Filter for pending or those assigned to this doctor
      const relevant = response.documents.filter(r => 
        r.status === 'pending' || r.doctor_id === user.id
      );

      // Sort by urgency: Critical first
      const sorted = relevant.sort((a, b) => a.urgency === 'critical' ? -1 : 1);
      setRequests(sorted);
    } catch (error) {
      console.error('Fetch requests failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_REQUESTS, id, {
        status: 'accepted',
        doctor_id: user.id
      });
      fetchRequests();
    } catch (error) {
      console.error('Accept failed:', error);
    }
  };

  const addMedicine = () => {
    setPrescription({ ...prescription, medicines: [...prescription.medicines, { name: '', dosage: '', duration: '' }] });
  };

  const removeMedicine = (index) => {
    const newMeds = prescription.medicines.filter((_, i) => i !== index);
    setPrescription({ ...prescription, medicines: newMeds });
  };

  const handlePrescriptionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In production, you'd create a separate 'prescriptions' collection document here
      // For the demo, we update the request status to completed
      await databases.updateDocument(DATABASE_ID, COLLECTION_REQUESTS, selectedRequest.$id, {
        status: 'completed'
      });
      
      setShowPrescriptionModal(false);
      setSelectedRequest(null);
      setPrescription({ diagnosis: '', medicines: [{ name: '', dosage: '', duration: '' }], advice: '' });
      fetchRequests();
    } catch (error) {
      console.error('Prescription submission failed:', error);
    }
    setLoading(false);
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const myAppointments = requests.filter(r => r.status === 'accepted' && r.doctor_id === user.id);
  
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }} className="container">
      {/* Prescription Modal */}
      <AnimatePresence>
        {showPrescriptionModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(8px)' }}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card" style={{ width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem', background: 'var(--surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{t('prescriptions')}</h3>
                  <p style={{ color: 'var(--text-muted)' }}>For: {selectedRequest?.patient?.full_name}</p>
                </div>
                <button onClick={() => setShowPrescriptionModal(false)}><X /></button>
              </div>

              <form onSubmit={handlePrescriptionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontWeight: 700 }}>Diagnosis / Clinical Findings</label>
                  <textarea required value={prescription.diagnosis} onChange={e => setPrescription({...prescription, diagnosis: e.target.value})} placeholder="e.g. Mild respiratory infection..." />
                </div>

                {checkInteractions(prescription.medicines).length > 0 && (
                  <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)', borderRadius: '12px' }}>
                    {checkInteractions(prescription.medicines).map((alert, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '0.5rem', color: 'var(--error)', fontSize: '0.85rem', fontWeight: 700 }}>
                        <AlertTriangle size={16} /> {alert.message}
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <label style={{ fontWeight: 700 }}>Medicines & Dosage</label>
                    <button type="button" onClick={addMedicine} style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: 700 }}>
                      <Plus size={16} /> Add More
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {prescription.medicines.map((med, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input placeholder="Medicine Name" style={{ flex: 2 }} value={med.name} onChange={e => { const newMeds = [...prescription.medicines]; newMeds[i].name = e.target.value; setPrescription({...prescription, medicines: newMeds}); }} />
                        <input placeholder="Dosage" style={{ flex: 1 }} value={med.dosage} onChange={e => { const newMeds = [...prescription.medicines]; newMeds[i].dosage = e.target.value; setPrescription({...prescription, medicines: newMeds}); }} />
                        <button type="button" onClick={() => removeMedicine(i)} style={{ color: 'var(--error)' }}><Trash2 size={18} /></button>
                      </div>
                    ))}
                  </div>
                </div>
                <button type="submit" disabled={loading} className="glow-on-hover" style={{ padding: '1rem', background: 'var(--primary)', color: 'white', borderRadius: '15px', fontWeight: 700 }}>
                  {loading ? 'Saving...' : 'Sign & Complete Visit'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <div>
          <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            {t('doctor')} Portal: <span className="text-gradient">{user.full_name}</span>
          </motion.h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="badge badge-success">Available</span>
            <p style={{ color: 'var(--text-muted)' }}>Verified Pro • License: {user.license_number || 'Verifying'}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem', border: '2px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2.5rem' }}>Priority Triage Queue</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {pendingRequests.map(r => (
                <div key={r.id} className="glass-card" style={{ padding: '1.5rem', borderLeft: `6px solid var(--${r.urgency_level === 'critical' ? 'error' : 'primary'})` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800 }}>{r.patient?.full_name}</div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.service} • {r.urgency_level.toUpperCase()}</p>
                    </div>
                    <button onClick={() => handleAccept(r.id)} className="glow-on-hover" style={{ padding: '0.5rem 1rem', background: 'var(--primary)', color: 'white', borderRadius: '10px' }}>Accept</button>
                  </div>
                </div>
              ))}
              {pendingRequests.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No pending patients.</p>}
            </div>
          </div>

          <ImpactLeaderboard />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {requests.find(r => r.type === 'emergency' && r.status === 'pending') && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card" 
              style={{ padding: '2rem', border: '2px solid var(--error)', background: '#fff1f2' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <AlertTriangle color="var(--error)" />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#991b1b' }}>INCOMING SOS ALERT</h3>
                </div>
                <div className="badge badge-error">CRITICAL</div>
              </div>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 600 }}>
                Patient {requests.find(r => r.type === 'emergency' && r.status === 'pending')?.patient?.full_name} reports severe distress. Dispatch protocols active.
              </p>
              <div style={{ height: '200px', borderRadius: '15px', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <LiveGridMap 
                  center={requests.find(r => r.type === 'emergency' && r.status === 'pending')?.location?.split(',').map(Number) || [20.5937, 78.9629]} 
                  zoom={14} 
                  markers={[{
                    position: requests.find(r => r.type === 'emergency' && r.status === 'pending')?.location?.split(',').map(Number) || [20.5937, 78.9629],
                    label: "Critical Patient",
                    urgency: 'critical'
                  }]} 
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={() => handleAccept(requests.find(r => r.type === 'emergency' && r.status === 'pending').$id)}
                  style={{ flex: 1, background: 'var(--error)', color: 'white', padding: '0.75rem', borderRadius: '10px', fontWeight: 800 }}
                >
                  ACCEPT & DISPATCH
                </button>
              </div>
            </motion.div>
          )}


          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Consultation Center</h3>
              {activeChat && <div className="badge badge-primary">Active: {activeChat.patient?.full_name}</div>}
            </div>

            {activeChat && <ClinicalBrief patientName={activeChat.patient?.full_name} />}
            
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {myAppointments.map(app => (
                <div key={app.id} className="glass-card" style={{ padding: '1.25rem', background: app.id === activeChat?.id ? 'var(--primary-light)' : 'var(--background)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{app.patient?.full_name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.service}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => { setSelectedRequest(app); setShowPrescriptionModal(true); }} style={{ padding: '0.5rem', background: 'white', border: '1px solid var(--border)', borderRadius: '8px' }}><FileText size={18} /></button>
                      <button onClick={() => setActiveChat(app)} style={{ padding: '0.5rem', background: 'var(--primary)', color: 'white', borderRadius: '8px' }}><MessageSquare size={18} /></button>
                    </div>
                  </div>
                </div>
              ))}
              {myAppointments.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No active appointments.</p>}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h4 style={{ fontWeight: 800 }}>Predictive Burnout Shield</h4>
              <div className="badge" style={{ background: myAppointments.length > 5 ? 'var(--error)' : 'var(--primary)', color: 'white' }}>
                {myAppointments.length > 5 ? 'Critical Load' : 'Optimal'}
              </div>
            </div>
            
            <div style={{ height: '120px', marginBottom: '1.5rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { time: '08:00', load: 2 }, { time: '10:00', load: 4 }, 
                  { time: '12:00', load: 8 }, { time: '14:00', load: 5 }, 
                  { time: '16:00', load: myAppointments.length }
                ]}>
                  <Bar dataKey="load" radius={[4, 4, 0, 0]}>
                    { [1,2,3,4,5].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 4 && myAppointments.length > 5 ? 'var(--error)' : 'var(--primary)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              {myAppointments.length > 5 
                ? 'CRITICAL: High patient volume detected. Rerouting new non-emergency cases to nearby nodes.' 
                : 'Current workload is stable. Predictive fatigue low for the next 2 hours.'}
            </p>
          </div>

        </div>

      </div>

      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 5000 }}>
        <AnimatePresence>
          {activeChat && (
            <ChatComponent requestId={activeChat.id} otherPartyName={activeChat.patient?.full_name || 'Patient'} onClose={() => setActiveChat(null)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DoctorDashboard;
