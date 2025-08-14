import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import ContactsEnhancedCards from './components/contacts/ContactsEnhancedCards';
import DealsBoard from './components/pipeline/DealsBoard';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contacts" element={<ContactsEnhancedCards />} />
        <Route path="/pipeline" element={<DealsBoard />} />
      </Routes>
    </>
  );
}
