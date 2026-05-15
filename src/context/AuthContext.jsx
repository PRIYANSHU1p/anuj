import React, { createContext, useContext, useEffect, useState } from 'react';
import { client, account } from '../lib/appwrite';
import { ID } from 'appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const session = await account.get();
      if (session) {
        // Appwrite stores custom data in 'prefs'
        let currentPrefs = session.prefs;
        if (!currentPrefs.role && session.email.includes('medlink.com')) {
           const email = session.email;
           const isDoctor = ['sameer', 'anjali', 'karan', 'aditi', 'manish'].some(n => email.startsWith(n));
           const role = isDoctor ? 'doctor' : 'patient';
           
           let spec = 'General Physician';
           if (email.startsWith('sameer')) spec = 'Cardiologist';
           if (email.startsWith('anjali')) spec = 'Dermatologist';
           if (email.startsWith('karan')) spec = 'Neurologist';
           if (email.startsWith('aditi')) spec = 'Pulmonologist';
           if (email.startsWith('manish')) spec = 'Diabetologist';

           currentPrefs = { 
             role, 
             specialization: spec,
             experience: isDoctor ? '10' : null,
             qualification: isDoctor ? 'MD / Specialist' : null
           };
           await account.updatePrefs(currentPrefs);
        }

        setUser({
          id: session.$id,
          $id: session.$id,
          email: session.email,
          full_name: session.name,
          role: currentPrefs.role || 'patient',
          ...currentPrefs
        });
      }
    } catch (error) {
      console.log('No active session found');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await checkUserStatus();
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email, password, metadata) => {
    try {
      // 1. Create the account
      const userId = ID.unique();
      await account.create(userId, email, password, metadata.full_name);
      
      // 2. Login to set the session (required to update prefs)
      await account.createEmailPasswordSession(email, password);
      
      // 3. Update user preferences with role and other metadata
      await account.updatePrefs({
        role: metadata.role,
        full_name: metadata.full_name,
        license_number: metadata.license_number || null,
        abha_id: metadata.abha_id || null,
        created_at: new Date().toISOString()
      });

      await checkUserStatus();
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
