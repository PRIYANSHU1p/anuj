import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    dashboard: 'Dashboard',
    services: 'Services',
    doctor: 'Doctor',
    patient: 'Patient',
    emergency: 'Emergency SOS',
    requestService: 'Book Appointment',
    healthVitals: 'Live Health Stats',
    aiTriage: 'AI Symptom Analyzer',
    prescriptions: 'Digital Prescriptions',
    analyze: 'Analyze Symptoms',
    login: 'Secure Login',
    signup: 'Create Account',
    hindi: 'हिंदी',
    english: 'English',
    waiting: 'Waiting for Doctor...',
    connected: 'Connected to Doctor',
    burnout: 'Burnout Alert',
    priority: 'Priority Level',
    abha: 'ABHA Health ID',
    medicalLocker: 'Medical Record Locker',
    liveChat: 'Secure Consultation Chat',
    karma: 'Health Karma (Seva)',
    intelligence: 'National Intelligence',
    digitalTwin: 'AI Health Digital Twin',
    outbreak: 'Outbreak Surveillance'
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    services: 'सेवाएं',
    doctor: 'डॉक्टर',
    patient: 'मरीज',
    emergency: 'आपातकालीन एसओएस',
    requestService: 'अपॉइंटमेंट बुक करें',
    healthVitals: 'स्वास्थ्य आँकड़े',
    aiTriage: 'AI लक्षण विश्लेषक',
    prescriptions: 'डिजिटल नुस्खा',
    analyze: 'लक्षणों की जांच करें',
    login: 'लॉगिन करें',
    signup: 'खाता बनाएं',
    hindi: 'हिंदी',
    english: 'English',
    waiting: 'डॉक्टर का इंतज़ार...',
    connected: 'डॉक्टर से जुड़े',
    burnout: 'बर्नआउट अलर्ट',
    priority: 'प्राथमिकता स्तर',
    abha: 'ABHA स्वास्थ्य आईडी',
    medicalLocker: 'मेडिकल रिकॉर्ड लॉकर',
    liveChat: 'सुरक्षित परामर्श चैट',
    karma: 'स्वास्थ्य कर्म (सेवा)',
    intelligence: 'राष्ट्रीय खुफिया',
    digitalTwin: 'AI स्वास्थ्य डिजिटल ट्विन',
    outbreak: 'रोग प्रकोप निगरानी'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
