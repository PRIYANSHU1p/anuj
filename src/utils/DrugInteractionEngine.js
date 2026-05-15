// Pre-defined dangerous drug interactions for the demonstration
// In a production environment, this would hit a comprehensive medical API
const INTERACTION_DATABASE = [
  { drugs: ['aspirin', 'warfarin'], severity: 'critical', message: 'Severe bleeding risk. Do not combine.' },
  { drugs: ['amoxicillin', 'methotrexate'], severity: 'high', message: 'Increases methotrexate toxicity.' },
  { drugs: ['ibuprofen', 'naproxen'], severity: 'medium', message: 'Increased risk of stomach ulcers.' },
  { drugs: ['acetaminophen', 'alcohol'], severity: 'critical', message: 'Severe liver damage risk.' }
];

export const checkInteractions = (medicines) => {
  const currentMeds = medicines.map(m => m.name.toLowerCase().trim());
  const alerts = [];

  INTERACTION_DATABASE.forEach(interaction => {
    const matches = interaction.drugs.filter(drug => currentMeds.some(med => med.includes(drug)));
    if (matches.length === interaction.drugs.length) {
      alerts.push(interaction);
    }
  });

  return alerts;
};
