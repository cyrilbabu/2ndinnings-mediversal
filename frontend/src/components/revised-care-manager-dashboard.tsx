import React, { useState } from 'react';
import { User, Heart, ClipboardList, Bell, Calendar, Phone, Hospital, FileText } from 'lucide-react';

const NotificationItem = ({ icon: Icon, title, description, onAction }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
    <div className="flex items-center">
      <Icon className="w-5 h-5 text-green-600 mr-3" />
      <div>
        <p className="font-medium text-green-800">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
    <button 
      onClick={onAction}
      className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
    >
      Take Action
    </button>
  </div>
);

const PatientCard = ({ patient, onViewDetails, onSubmitReport }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold text-green-800">{patient.name}</h3>
      <span className={`px-2 py-1 rounded-full text-xs ${
        patient.status === 'Critical' ? 'bg-red-100 text-red-800' : 
        patient.status === 'Stable' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}>
        {patient.status}
      </span>
    </div>
    <p className="text-sm text-gray-600 mb-2">Age: {patient.age}, Plan: {patient.plan}</p>
    <p className="text-sm text-gray-600 mb-4">Last Check: {patient.lastCheck}</p>
    <div className="flex space-x-2">
      <button 
        onClick={() => onViewDetails(patient.id)}
        className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
      >
        View Details
      </button>
      <button 
        onClick={() => onSubmitReport(patient.id)}
        className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Submit Report
      </button>
    </div>
  </div>
);

const CallReportForm = ({ patientName, onSubmit, onCancel }) => {
  const [report, setReport] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(report);
    setReport('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Submit Call Report for {patientName}</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={report}
            onChange={(e) => setReport(e.target.value)}
            className="w-full h-40 p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Enter call report details..."
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function RevisedCareManagerDashboard() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [patients, setPatients] = useState([
    { id: 1, name: "Raj Kumar", age: 72, plan: "Premium", status: "Stable", lastCheck: "2023-08-20" },
    { id: 2, name: "Priya Sharma", age: 68, plan: "Basic", status: "Needs Attention", lastCheck: "2023-08-18" },
    // Add more mock patients as needed
  ]);

  const notifications = [
    { icon: Phone, title: "Wellness Check Due", description: "Call Raj Kumar for monthly wellness check" },
    { icon: Hospital, title: "Upcoming Hospital Visit", description: "Priya Sharma has a cardiology appointment on 2023-09-05" },
    { icon: Bell, title: "Medication Reminder", description: "Remind Amit Patel about new medication schedule" },
  ];

  const handleViewDetails = (patientId) => {
    // Implement view details functionality
    console.log("Viewing details for patient", patientId);
  };

  const handleSubmitReport = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    setSelectedPatient(patient);
    setShowReportForm(true);
  };

  const handleReportSubmission = (report) => {
    console.log("Submitting report for", selectedPatient.name, ":", report);
    setShowReportForm(false);
    setSelectedPatient(null);
    // Here you would typically send the report to your backend
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-800">Care Manager Dashboard</h1>
        <div className="flex items-center">
          <User className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-green-800">Welcome, Dr. Mehra</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-green-800 mb-4">High Priority Notifications</h2>
            {notifications.map((notification, index) => (
              <NotificationItem 
                key={index} 
                {...notification} 
                onAction={() => console.log("Action taken for", notification.title)}
              />
            ))}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-green-800 mb-4">Assigned Patients</h2>
            {patients.map(patient => (
              <PatientCard 
                key={patient.id} 
                patient={patient} 
                onViewDetails={handleViewDetails}
                onSubmitReport={handleSubmitReport}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Quick Actions</h2>
            <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300 mb-2">
              Start Wellness Call
            </button>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
              View All Reports
            </button>
          </div>
        </div>
      </div>

      {showReportForm && selectedPatient && (
        <CallReportForm 
          patientName={selectedPatient.name}
          onSubmit={handleReportSubmission}
          onCancel={() => setShowReportForm(false)}
        />
      )}
    </div>
  );
}