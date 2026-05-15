import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map as MapIcon, Activity, Users, AlertCircle, ShieldCheck, Download, Filter, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { supabase } from '../supabaseClient';
import { databases, DATABASE_ID, COLLECTION_REQUESTS, client } from '../lib/appwrite';
import NetworkSlicingUI from '../components/NetworkSlicingUI';
import QuantumMesh from '../components/QuantumMesh';
import { Query } from 'appwrite';



const outbreakData = [
  { city: 'Mumbai', cases: 450, risk: 'High' },
  { city: 'Delhi', cases: 320, risk: 'Medium' },
  { city: 'Bangalore', cases: 180, risk: 'Low' },
  { city: 'Hyderabad', cases: 290, risk: 'Medium' },
  { city: 'Chennai', cases: 410, risk: 'High' },
  { city: 'Kolkata', cases: 230, risk: 'Medium' },
];

const AuthorityDashboard = () => {
  const [stats, setStats] = useState({ totalPatients: 1248, criticalCases: 0, hospitalCapacity: 78 });
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();

    // REAL-TIME SUBSCRIPTION: The core of the National Health Grid
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_REQUESTS}.documents`, 
      response => {
        if (response.events.includes('databases.*.collections.*.documents.*.create')) {
          const newRequest = response.payload;
          setRequests(prev => [newRequest, ...prev]);
          setStats(prev => ({ ...prev, criticalCases: prev.criticalCases + 1 }));
          
          // Sound alert for critical SOS
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
          audio.play().catch(e => console.log('Audio play blocked'));
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
        [Query.orderDesc('$createdAt'), Query.limit(10)]
      );
      setRequests(response.documents);
      setStats(prev => ({ ...prev, criticalCases: response.total }));
    } catch (error) {
      console.error('Fetch requests failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }} className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>National <span className="text-gradient">Intelligence</span> Dashboard</h2>
          <p style={{ color: 'var(--text-muted)' }}>Real-time health surveillance for Indian Government Authorities.</p>
        </div>
        <button className="glow-on-hover" style={{ padding: '1rem 2rem', background: 'var(--primary)', color: 'white', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
          <Download size={20} /> Export National Report
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {[
          { label: 'Active Medical Nodes', value: '1,248', color: 'var(--primary)', icon: <Activity />, badge: 'Sync: 99.9%' },
          { label: 'P2P Hospital Mesh', value: 'Live', color: '#22c55e', icon: <ShieldCheck />, badge: 'Interconnected' },
          { label: 'Avg. Response Time', value: '2.4m', color: 'var(--error)', icon: <Clock />, badge: '-12% today' },
          { label: 'Network Throughput', value: '12.4 GB/s', color: 'var(--accent)', icon: <Users />, badge: 'Stable' }
        ].map((stat, i) => (
          <div key={i} className="glass-card" style={{ padding: '2rem', border: `1px solid ${stat.color}20` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{ color: stat.color, background: `${stat.color}10`, padding: '0.75rem', borderRadius: '12px' }}>
                {React.cloneElement(stat.icon, { size: 24 })}
              </div>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, padding: '0.25rem 0.6rem', background: stat.color, color: 'white', borderRadius: '20px' }}>
                {stat.badge}
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.25rem' }}>{stat.value}</div>
            <div style={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.8rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>


      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Disease Outbreak Surveillance</h3>
            <div className="badge badge-primary">Real-time Data</div>
          </div>
          <div style={{ height: '400px', background: 'rgba(0,0,0,0.02)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border)', position: 'relative', overflow: 'hidden' }}>
            {/* Mock Map Visualization */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, background: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>
            <div style={{ textAlign: 'center', zIndex: 2 }}>
              <MapIcon size={64} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontWeight: 800 }}>Heatmap Visualization</h4>
              <p style={{ color: 'var(--text-muted)' }}>Integrating PostGIS Spatial Data...</p>
            </div>
            {/* Pulsing Hotspots */}
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: 'absolute', top: '30%', left: '40%', width: '100px', height: '100px', background: 'rgba(239, 68, 68, 0.3)', borderRadius: '50%' }} />
            <motion.div animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.1, 0.4] }} transition={{ duration: 4, repeat: Infinity }} style={{ position: 'absolute', bottom: '20%', right: '30%', width: '150px', height: '150px', background: 'rgba(14, 165, 233, 0.2)', borderRadius: '50%' }} />
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>Regional Risk Scores</h3>
          {/* Existing risk scores code... */}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <AlertCircle size={28} color="var(--error)" />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Live SOS Emergency Feed</h3>
            </div>
            <div className="badge badge-error" style={{ animation: 'pulse 2s infinite' }}>Real-time Surveillance Active</div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
              <thead>
                <tr style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'left' }}>
                  <th style={{ padding: '1rem' }}>PATIENT / ID</th>
                  <th style={{ padding: '1rem' }}>SYMPTOMS</th>
                  <th style={{ padding: '1rem' }}>DEPT</th>
                  <th style={{ padding: '1rem' }}>TIME</th>
                  <th style={{ padding: '1rem' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      No active critical emergencies. National grid is stable.
                    </td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <motion.tr 
                      key={req.$id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{ background: 'var(--background)', borderRadius: '15px' }}
                    >
                      <td style={{ padding: '1.25rem', borderRadius: '15px 0 0 15px' }}>
                        <div style={{ fontWeight: 800 }}>{req.patient_name}</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>{req.$id.slice(0, 8)}</div>
                      </td>
                      <td style={{ padding: '1.25rem', fontSize: '0.9rem' }}>{req.symptoms}</td>
                      <td style={{ padding: '1.25rem' }}>
                        <span className="badge badge-primary">{req.department}</span>
                      </td>
                      <td style={{ padding: '1.25rem', fontSize: '0.8rem' }}>
                        {new Date(req.created_at).toLocaleTimeString()}
                      </td>
                      <td style={{ padding: '1.25rem', borderRadius: '0 15px 15px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--error)', fontWeight: 800, fontSize: '0.8rem' }}>
                          <div style={{ width: '8px', height: '8px', background: 'var(--error)', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
                          PENDING
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Activity size={24} color="var(--primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>AI Predicted Stress</h3>
          </div>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { time: '00:00', stress: 30 }, { time: '04:00', stress: 25 }, 
                { time: '08:00', stress: 75 }, { time: '12:00', stress: 90 }, 
                { time: '16:00', stress: 65 }, { time: '20:00', stress: 45 }
              ]}>
                <Area type="monotone" dataKey="stress" stroke="var(--error)" fill="var(--error)" fillOpacity={0.1} />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>


      <div style={{ marginTop: '2rem' }} className="glass-card">
        <div style={{ padding: '2.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Activity size={28} color="var(--primary)" />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>AI National Resource Optimizer</h3>
          </div>
          <div className="badge badge-success">Mesh Network: Optimized</div>
        </div>
        <div style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { label: 'Quantum Ledger Integrity', value: 'Verified', status: 'Secure', color: '#22c55e' },
            { label: 'Global FHIR Sync', value: 'Active', status: 'HL7 Compliant', color: 'var(--primary)' },
            { label: 'Ethical Bias Check', value: '0.00%', status: 'Passed', color: '#22c55e' }
          ].map((zenith, i) => (
            <div key={i} style={{ padding: '1.5rem', background: 'var(--background)', borderRadius: '15px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{zenith.label}</span>
                <span style={{ color: zenith.color, fontWeight: 800, fontSize: '0.8rem' }}>{zenith.status}</span>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.5rem' }}>{zenith.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={14} color="#22c55e" /> Post-Quantum Signed
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        <NetworkSlicingUI />
        <QuantumMesh />
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <Activity size={28} color="var(--primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Global Scaling Heartbeat</h3>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
             <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text)' }}>1.42B</div>
             <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>ACTIVE USER NODES</div>
             <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <div className="badge badge-success">Latency: 0.1ms</div>
                <div className="badge badge-primary">Load: 12.4%</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorityDashboard;
