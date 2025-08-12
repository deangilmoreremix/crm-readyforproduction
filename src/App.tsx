/**
 * NOTE: This file is not used by the current app entry.
 * The application mounts ProgressiveApp via main.tsx with BrowserRouter and required providers.
 * References:
 * - main.tsx mounts &lt;ProgressiveApp /&gt; (see src/main.tsx)
 * - ProgressiveApp.tsx defines actual providers and Routes (see src/ProgressiveApp.tsx)
 *
 * This file is retained for legacy/reference. Do not modify routing here unless switching the entrypoint.
 */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import ContactsEnhancedCards from './components/contacts/ContactsEnhancedCards';
import DealsBoard from './components/pipeline/DealsBoard';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contacts" element={<ContactsEnhancedCards />} />
        <Route path="/pipeline" element={<DealsBoard />} />
      </Routes>
    </BrowserRouter>
  );
}
