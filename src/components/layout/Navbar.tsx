import React from 'react';
import { NavLink } from 'react-router-dom';
import ResearchModal from '../modals/ResearchModal';

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const base = 'px-3 py-2 text-sm rounded-md';
  const active = 'text-blue-600';
  const idle = 'text-gray-600 hover:text-gray-900';
  return (
    <nav className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-3">
        <div className="font-semibold">SmartCRM</div>
        <div className="flex items-center gap-2">
          <NavLink to="/dashboard" className={({isActive})=> `${base} ${isActive?active:idle}`}>Dashboard</NavLink>
          <NavLink to="/contacts" className={({isActive})=> `${base} ${isActive?active:idle}`}>Contacts</NavLink>
          <NavLink to="/pipeline" className={({isActive})=> `${base} ${isActive?active:idle}`}>Pipeline</NavLink>
          <NavLink to="/ai-goals" className={({isActive})=> `${base} ${isActive?active:idle}`}>AI Goals</NavLink>
          <button onClick={()=>setOpen(true)} className={`${base} ${idle}`}>Research</button>
        </div>
      </div>
      {open && <ResearchModal onClose={()=>setOpen(false)} />}
    </nav>
  );
}
