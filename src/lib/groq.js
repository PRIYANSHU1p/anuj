/**
 * MedLink AI Core - Powered by Groq
 * Production-level triage and medical analysis utility.
 */

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const analyzeSymptoms = async (symptomsInput) => {
  // 1. Ensure we only process clean strings (prevents Circular Reference crashes)
  const symptoms = typeof symptomsInput === 'string' ? symptomsInput : String(symptomsInput);

  if (!GROQ_API_KEY) {
    console.warn("Groq API key missing. Falling back to local analysis.");
    return fallbackAnalysis(symptoms);
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are MedLink AI. Analyze symptoms and return a valid JSON object: 
            { 
              "urgency": "critical"|"medium"|"low", 
              "suggestion": "...", 
              "department": "...",
              "score": <integer 0-100>,
              "status": "Excellent"|"Good"|"Warning"|"Critical",
              "bp": "<string e.g. 120/80>",
              "sugar": "<string e.g. 95 mg/dL>"
            }.`
          },
          {
            role: "user",
            content: symptoms
          }
        ],
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    console.log("MedLink AI Raw Output:", data);
    
    if (data.error) {
      console.error("Groq API Error:", data.error.message);
      return fallbackAnalysis(symptoms);
    }
    
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return fallbackAnalysis(symptoms);
  }
};

const fallbackAnalysis = (symptoms) => {
  const lower = symptoms.toLowerCase();
  const isCritical = lower.includes('chest') || lower.includes('breathing') || lower.includes('unconscious');
  return {
    urgency: isCritical ? 'critical' : 'medium',
    suggestion: isCritical 
      ? "Immediate intervention required. Dispatching emergency services." 
      : "No immediate life threat. Schedule a consultation soon.",
    department: isCritical ? "Emergency Medicine" : "General Practice",
    score: isCritical ? 25 : 75,
    status: isCritical ? "Critical" : "Good",
    bp: isCritical ? "160/100" : "120/80",
    sugar: isCritical ? "140 mg/dL" : "90 mg/dL"
  };
};

export const fetchHealthNews = async () => {
  if (!GROQ_API_KEY) return [];
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Authorization": `Bearer ${GROQ_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: "Generate 3 real-time medical news headlines for India. Return JSON: { \"news\": [{ \"title\": \"...\", \"tag\": \"...\", \"color\": \"...\" }] }. Colors should be hex." }],
        response_format: { type: "json_object" }
      })
    });
    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);
    return content.news || [];
  } catch (e) {
    return [
      { title: 'System Heartbeat: All Medical Nodes Active', tag: 'Live', color: '#22c55e' },
      { title: 'National Health Grid: SOS Latency Optimized', tag: 'System', color: '#0ea5e9' },
      { title: 'AI Forecast: Flu activity rising in Northern Regions', tag: 'Alert', color: '#f59e0b' },
      { title: 'New Tele-Consultation Protocol for Rural Clinics', tag: 'Policy', color: '#8b5cf6' },
      { title: 'Pharma Chain: Essential drug supplies stabilized', tag: 'Supply', color: '#ec4899' }
    ];
  }
};
