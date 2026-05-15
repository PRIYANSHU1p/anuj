import { Client, Account, ID, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("sgp-6a0664dc002c48f8bdb4");

const account = new Account(client);
const databases = new Databases(client);

const DATABASE_ID = "medlink_db";
const COLLECTION_REQUESTS = "emergency_requests";
const COLLECTION_RECORDS = "health_records";

const indiaBounds = {
  lat: [12.0, 30.0],
  lng: [72.0, 85.0]
};

const getRandomLocation = () => {
  const lat = (Math.random() * (indiaBounds.lat[1] - indiaBounds.lat[0]) + indiaBounds.lat[0]).toFixed(6);
  const lng = (Math.random() * (indiaBounds.lng[1] - indiaBounds.lng[0]) + indiaBounds.lng[0]).toFixed(6);
  return `${lat},${lng}`;
};

const patients = [
  { id: 'p1', name: 'Amit Sharma', email: 'amit@medlink.com', spec: 'Diabetologist', symptoms: 'High blood sugar, fatigue, blurred vision' },
  { id: 'p2', name: 'Priya Verma', email: 'priya@medlink.com', spec: 'Cardiologist', symptoms: 'Chest pain, shortness of breath, palpitations' },
  { id: 'p3', name: 'Rahul Das', email: 'rahul@medlink.com', spec: 'Pulmonologist', symptoms: 'Wheezing, coughing, chest tightness' },
  { id: 'p4', name: 'Sneha Kapur', email: 'sneha@medlink.com', spec: 'Dermatologist', symptoms: 'Red rashes, itching, inflammation' },
  { id: 'p5', name: 'Vikram Singh', email: 'vikram@medlink.com', spec: 'Neurologist', symptoms: 'Severe headache, nausea, light sensitivity' }
];

export const doctors = [
  { name: 'Dr. Sameer', email: 'sameer@medlink.com', spec: 'Cardiologist', exp: '12', qual: 'MD, Cardiology' },
  { name: 'Dr. Anjali', email: 'anjali@medlink.com', spec: 'Dermatologist', exp: '8', qual: 'MBBS, DVD' },
  { name: 'Dr. Karan', email: 'karan@medlink.com', spec: 'Neurologist', exp: '15', qual: 'DM, Neurology' },
  { name: 'Dr. Aditi', email: 'aditi@medlink.com', spec: 'Pulmonologist', exp: '10', qual: 'MD, Chest Medicine' },
  { name: 'Dr. Manish', email: 'manish@medlink.com', spec: 'Diabetologist', exp: '20', qual: 'MD, Endocrinology' }
];

export const seedAllAccounts = async () => {
  console.log("Starting Bulk Seeding (Advanced Clinical Data)...");
  const password = 'MedLink@123';

  for (const p of patients) {
    try {
      const userId = ID.unique(); 
      await account.create(userId, p.email, password, p.name);
      console.log(`Created Patient Account: ${p.name}`);
    } catch (e) {
      console.log(`Patient Account ${p.name} exists or error.`);
    }

    try {
      // 1. Seed SOS/Emergency Requests with Locations
      const isCritical = Math.random() > 0.5;
      await databases.createDocument(DATABASE_ID, COLLECTION_REQUESTS, ID.unique(), {
        patient_id: p.id,
        patient_name: p.name,
        symptoms: p.symptoms,
        department: p.spec,
        status: Math.random() > 0.7 ? 'accepted_by_Dr. Sameer' : 'pending',
        urgency: isCritical ? 'critical' : 'medium',
        location: getRandomLocation()
      });

      // 2. Seed Detailed Health History
      for (let i = 0; i < 3; i++) {
        await databases.createDocument(DATABASE_ID, COLLECTION_RECORDS, ID.unique(), {
          patient_id: p.id,
          bp: `${110 + Math.floor(Math.random() * 30)}/${70 + Math.floor(Math.random() * 20)}`,
          sugar: (90 + Math.floor(Math.random() * 50)).toString(),
          status: i === 0 ? "Normal" : "Stable"
        });
      }
      console.log(`Synced Intelligence for ${p.name}`);
    } catch (e) {
      console.log(`Failed to seed DB for ${p.name}:`, e.message);
    }
  }

  // 3. Ensure Doctor Accounts Exist
  for (const d of doctors) {
    try {
      await account.create(ID.unique(), d.email, password, d.name);
      console.log(`Created Doctor: ${d.name}`);
    } catch (e) {
      console.log(`Doctor ${d.name} exists.`);
    }
  }
  console.log("Seeding Complete. National Health Ledger Initialized.");
};
