import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Microscope, ShieldCheck, AlertCircle, Search, RefreshCw, X } from 'lucide-react';

const AIVisionScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [file, setFile] = useState(null);

  const handleScan = () => {
    if (!file) return;
    setScanning(true);
    // Simulate complex AI processing
    setTimeout(() => {
      setResult({
        finding: 'Early Pulmonary Infiltration Detected',
        confidence: 94.8,
        region: 'Lower Left Lobe',
        suggestion: 'Correlate with clinical findings. High urgency for specialist review.'
      });
      setScanning(false);
    }, 3000);
  };

  return (
    <div className="glass-card" style={{ padding: '2.5rem', background: 'var(--surface)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Microscope size={28} color="var(--primary)" />
        <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>AI Vision Diagnostics</h3>
      </div>

      {!file ? (
        <div 
          onClick={() => document.getElementById('reportUpload').click()}
          style={{ border: '2px dashed var(--border)', borderRadius: '20px', padding: '4rem 2rem', textAlign: 'center', cursor: 'pointer', background: 'rgba(0,0,0,0.02)' }}
        >
          <Upload size={48} color="var(--text-muted)" style={{ marginBottom: '1.5rem' }} />
          <h4 style={{ fontWeight: 800 }}>Upload X-Ray / Lab Report</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>DeepScan AI will analyze the image for hidden patterns.</p>
          <input id="reportUpload" type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          <div style={{ padding: '1.5rem', background: 'var(--background)', borderRadius: '20px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
             <div style={{ width: '50px', height: '50px', background: 'var(--primary-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <ShieldCheck color="var(--primary)" />
             </div>
             <div style={{ flex: 1 }}>
               <div style={{ fontWeight: 800 }}>{file.name}</div>
               <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ready for Neural Scan</div>
             </div>
             <button onClick={() => {setFile(null); setResult(null);}}><X size={20} /></button>
          </div>

          {!result && (
            <button 
              onClick={handleScan}
              disabled={scanning}
              className="glow-on-hover"
              style={{ width: '100%', padding: '1.25rem', background: 'var(--primary)', color: 'white', borderRadius: '15px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
            >
              {scanning ? <RefreshCw className="animate-spin" /> : <Search />}
              {scanning ? 'Neural Network Processing...' : 'Run AI Vision Scan'}
            </button>
          )}

          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '2rem', border: '1px solid var(--primary)', background: 'rgba(14, 165, 233, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div className="badge badge-primary">Confidence: {result.confidence}%</div>
                  <div style={{ color: 'var(--primary)', fontWeight: 800 }}>V3.1 Neural Engine</div>
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>{result.finding}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.6 }}>{result.suggestion}</p>
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  LOCATION: {result.region} • SCAN ID: #AI-{Math.floor(Math.random()*10000)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default AIVisionScanner;
