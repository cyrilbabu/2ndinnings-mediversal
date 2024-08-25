import React, { useState } from 'react';
import { ArrowLeft, Save, Send } from 'lucide-react';

const InputField = ({ label, type = "text", value, onChange, options = [] }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-green-800 mb-1">{label}</label>
    {type === "textarea" ? (
      <textarea
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-green-300 rounded-md"
        rows="4"
      />
    ) : type === "select" ? (
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-green-300 rounded-md"
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-green-300 rounded-md"
      />
    )}
  </div>
);

export default function SubmitReportView({ patientName, onSubmit, onCancel }) {
  const [reportData, setReportData] = useState({
    callDate: '',
    callDuration: '',
    patientMood: '',
    physicalHealth: '',
    mentalHealth: '',
    medicationAdherence: '',
    dietAdherence: '',
    exerciseAdherence: '',
    socialEngagement: '',
    concerns: '',
    actionsTaken: '',
    followUpNeeded: '',
    followUpDetails: '',
    additionalNotes: ''
  });

  const handleInputChange = (field, value) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reportData);
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <header className="flex items-center mb-6">
        <button onClick={onCancel} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-green-800" />
        </button>
        <h1 className="text-2xl font-bold text-green-800">Submit Report for {patientName}</h1>
      </header>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Call Date"
            type="date"
            value={reportData.callDate}
            onChange={(e) => handleInputChange('callDate', e.target.value)}
          />
          <InputField
            label="Call Duration (minutes)"
            type="number"
            value={reportData.callDuration}
            onChange={(e) => handleInputChange('callDuration', e.target.value)}
          />
          <InputField
            label="Patient Mood"
            type="select"
            value={reportData.patientMood}
            onChange={(e) => handleInputChange('patientMood', e.target.value)}
            options={["Happy", "Neutral", "Sad", "Anxious", "Irritable"]}
          />
          <InputField
            label="Physical Health"
            type="select"
            value={reportData.physicalHealth}
            onChange={(e) => handleInputChange('physicalHealth', e.target.value)}
            options={["Excellent", "Good", "Fair", "Poor"]}
          />
          <InputField
            label="Mental Health"
            type="select"
            value={reportData.mentalHealth}
            onChange={(e) => handleInputChange('mentalHealth', e.target.value)}
            options={["Excellent", "Good", "Fair", "Poor"]}
          />
          <InputField
            label="Medication Adherence"
            type="select"
            value={reportData.medicationAdherence}
            onChange={(e) => handleInputChange('medicationAdherence', e.target.value)}
            options={["Fully Adherent", "Mostly Adherent", "Partially Adherent", "Non-Adherent"]}
          />
          <InputField
            label="Diet Adherence"
            type="select"
            value={reportData.dietAdherence}
            onChange={(e) => handleInputChange('dietAdherence', e.target.value)}
            options={["Fully Adherent", "Mostly Adherent", "Partially Adherent", "Non-Adherent"]}
          />
          <InputField
            label="Exercise Adherence"
            type="select"
            value={reportData.exerciseAdherence}
            onChange={(e) => handleInputChange('exerciseAdherence', e.target.value)}
            options={["Fully Adherent", "Mostly Adherent", "Partially Adherent", "Non-Adherent"]}
          />
        </div>

        <InputField
          label="Social Engagement"
          type="textarea"
          value={reportData.socialEngagement}
          onChange={(e) => handleInputChange('socialEngagement', e.target.value)}
        />
        <InputField
          label="Concerns Raised"
          type="textarea"
          value={reportData.concerns}
          onChange={(e) => handleInputChange('concerns', e.target.value)}
        />
        <InputField
          label="Actions Taken"
          type="textarea"
          value={reportData.actionsTaken}
          onChange={(e) => handleInputChange('actionsTaken', e.target.value)}
        />
        <InputField
          label="Follow-up Needed"
          type="select"
          value={reportData.followUpNeeded}
          onChange={(e) => handleInputChange('followUpNeeded', e.target.value)}
          options={["Yes", "No"]}
        />
        {reportData.followUpNeeded === "Yes" && (
          <InputField
            label="Follow-up Details"
            type="textarea"
            value={reportData.followUpDetails}
            onChange={(e) => handleInputChange('followUpDetails', e.target.value)}
          />
        )}
        <InputField
          label="Additional Notes"
          type="textarea"
          value={reportData.additionalNotes}
          onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
        />

        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 flex items-center"
          >
            <Send className="w-5 h-5 mr-2" />
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}
