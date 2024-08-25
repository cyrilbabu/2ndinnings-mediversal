import React, { useState } from 'react';
import { Users, Activity, Home, ClipboardList, Shield } from 'lucide-react';

const BanyanBackground = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="banyan-bg" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M0 50C20 50 20 40 40 40C60 40 60 50 80 50C100 50 100 40 120 40" stroke="#2F855A" strokeWidth="1" fill="none" strokeOpacity="0.3"/>
        <path d="M0 55C20 55 20 65 40 65C60 65 60 55 80 55C100 55 100 65 120 65" stroke="#2F855A" strokeWidth="1" fill="none" strokeOpacity="0.3"/>
        <circle cx="25" cy="10" r="3" fill="#2F855A" fillOpacity="0.2"/>
        <circle cx="75" cy="20" r="4" fill="#2F855A" fillOpacity="0.2"/>
        <circle cx="50" cy="30" r="2" fill="#2F855A" fillOpacity="0.2"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#banyan-bg)"/>
  </svg>
);

const NamasteAnimation = () => (
  <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="#2F855A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 20 V60" strokeDasharray="40" strokeDashoffset="40">
        <animate attributeName="stroke-dashoffset" from="40" to="0" dur="0.5s" fill="freeze" />
      </path>
      <path d="M30 40 Q50 20 70 40" strokeDasharray="60" strokeDashoffset="60">
        <animate attributeName="stroke-dashoffset" from="60" to="0" dur="0.5s" fill="freeze" begin="0.5s" />
      </path>
    </g>
  </svg>
);

const LoginButton = ({ role, icon: Icon, onClick }) => (
  <button 
    className="flex items-center justify-start w-full px-6 py-4 mt-4 text-green-800 transition-all duration-300 bg-white bg-opacity-80 rounded-lg hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    onClick={onClick}
  >
    <Icon className="w-6 h-6 mr-4" />
    <span className="text-lg font-semibold">Login as {role}</span>
  </button>
);

const AdminLoginButton = ({ onClick }) => (
  <button 
    className="absolute top-4 right-4 flex items-center px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-full hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    onClick={onClick}
  >
    <Shield className="w-4 h-4 mr-2" />
    Admin Login
  </button>
);

export default function BanyanThemePageWithNamaste() {
  const [showNamaste, setShowNamaste] = useState(false);

  const handleButtonClick = () => {
    setShowNamaste(true);
    setTimeout(() => setShowNamaste(false), 1500); // Hide after 1.5 seconds
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-green-50 overflow-hidden">
      <BanyanBackground />
      <AdminLoginButton onClick={handleButtonClick} />
      {showNamaste && <NamasteAnimation />}
      <div className="relative w-full max-w-2xl p-8 bg-white bg-opacity-90 rounded-xl shadow-lg backdrop-blur-sm">
        <div className="text-center mb-8">
          <svg className="mx-auto w-20 h-20 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 18a5 5 0 0 0-10 0"></path>
            <line x1="12" y1="9" x2="12" y2="2"></line>
            <path d="M4.22 10a5 5 0 0 1 7.78-4.5"></path>
            <path d="M19.78 10a5 5 0 0 0-7.78-4.5"></path>
          </svg>
          <h1 className="mt-4 text-4xl font-bold text-green-800">2nd Innings Program</h1>
          <p className="mt-2 text-xl text-green-600">Elder Care Management System</p>
        </div>
        
        <div className="space-y-4">
          <LoginButton role="Front Desk" icon={Users} onClick={handleButtonClick} />
          <LoginButton role="Care Manager" icon={Activity} onClick={handleButtonClick} />
          <LoginButton role="Home Care Staff" icon={Home} onClick={handleButtonClick} />
          <LoginButton role="Assessor" icon={ClipboardList} onClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
}
