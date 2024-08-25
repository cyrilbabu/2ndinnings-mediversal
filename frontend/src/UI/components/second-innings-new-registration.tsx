import React from 'react';
import { User, Phone, Mail, Home, Heart, AlertTriangle } from 'lucide-react';

const InputField = ({ icon: Icon, label, type = "text" }) => (
  <div className="flex items-center bg-white rounded-lg shadow-sm p-2 mb-4">
    <Icon className="text-green-600 w-5 h-5 mr-2" />
    <div className="flex-grow">
      <label className="text-sm text-green-800 block">{label}</label>
      <input type={type} className="w-full outline-none text-green-800" />
    </div>
  </div>
);

export default function NewRegistration() {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">New Member Registration</h1>
      <form className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField icon={User} label="Full Name" />
          <InputField icon={User} label="Date of Birth" type="date" />
          <InputField icon={Phone} label="Phone Number" type="tel" />
          <InputField icon={Mail} label="Email Address" type="email" />
          <InputField icon={Home} label="Address" />
          <InputField icon={AlertTriangle} label="Emergency Contact" />
        </div>
        
        <div className="mt-6">
          <label className="block text-green-800 mb-2">Membership Plan</label>
          <div className="flex space-x-4">
            {['Basic', 'Advanced', 'Premium'].map(plan => (
              <label key={plan} className="flex items-center">
                <input type="radio" name="plan" className="mr-2" />
                <span>{plan}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-green-800 mb-2">Health Conditions</label>
          <textarea 
            className="w-full h-24 p-2 border border-green-300 rounded-md"
            placeholder="List any existing health conditions..."
          ></textarea>
        </div>
        
        <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300">
          Register Member
        </button>
      </form>
    </div>
  );
}
