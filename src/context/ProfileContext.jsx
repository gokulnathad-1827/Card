// src/context/ProfileContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';
import { profileData as fallbackProfile } from '../data/profile';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(fallbackProfile);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [stats, setStats] = useState(fallbackProfile.stats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOffline, setIsOffline] = useState(false);
  const [dbEngine, setDbEngine] = useState('local');

  const fetchProfileData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProfileData();
      if (data) {
        setProfile(data.profile || fallbackProfile);
        setSkills(data.skills || []);
        setProjects(data.projects || []);
        setLeadership(data.leadership || []);
        setStats(data.stats || fallbackProfile.stats);
        setIsOffline(data.isOffline || false);
        setDbEngine(data.engine || 'local');
      }
    } catch (err) {
      console.error('Failed to load live data:', err);
      setError('Unable to load latest data from server. Showing cached profile.');
      setIsOffline(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const value = {
    profile,
    skills,
    projects,
    leadership,
    stats,
    loading,
    error,
    isOffline,
    dbEngine,
    refetch: fetchProfileData,
    setProfile,
    setSkills,
    setProjects,
    setLeadership
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
