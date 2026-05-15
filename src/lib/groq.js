/**
 * MedLink AI Core - Powered by Groq
 * Production-level triage and medical analysis utility.
 */

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const analyzeSymptoms = async (symptoms) => {
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
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: `You are MedLink AI, a critical triage assistant for a National Health Grid. 
            Analyze the symptoms provided and return a JSON object with:
            1. urgency: 'critical' or 'medium' or 'low'
            2. suggestion: Short, actionable medical advice (max 2 sentences).
            3. department: Which hospital department should handle this (e.g., Cardiology, ER, General).
            
            Be extremely precise. If life-threatening symptoms are mentioned, urgency MUST be 'critical'.`
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
    department: isCritical ? "Emergency Medicine" : "General Practice"
  };
};
