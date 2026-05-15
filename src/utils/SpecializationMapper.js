export const DISEASE_SPECIALIZATION_MAP = {
  'Diabetes': 'Diabetologist',
  'Heart Disease': 'Cardiologist',
  'Asthma': 'Pulmonologist',
  'Skin Allergy': 'Dermatologist',
  'Migraine': 'Neurologist',
  'General': 'General Physician'
};

export const getSpecialistForDisease = (disease) => {
  return DISEASE_SPECIALIZATION_MAP[disease] || 'General Physician';
};
