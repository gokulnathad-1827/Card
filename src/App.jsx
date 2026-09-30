// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Note: react-router-dom
import { ToastProvider } from './components/Toast';
import { ProfileProvider } from './context/ProfileContext';
import PublicProfile from './components/PublicProfile';
import AdminDashboard from './components/admin/AdminDashboard';

export default function App() {
  return (
    <ToastProvider>
      <ProfileProvider>
        <Routes>
          <Route path="/" element={<PublicProfile />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </ProfileProvider>
    </ToastProvider>
  );
}
