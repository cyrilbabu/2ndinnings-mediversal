import React, { useState } from "react";
import { ArrowLeft, Save, Send } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const InputField = ({ label, type = "text", value }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-green-800 mb-1">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        value={value}
        readOnly
        className="w-full p-2 border border-green-300 rounded-md"
        rows="4"
      />
    ) : (
      <input
        type={type}
        value={value}
        readOnly
        className="w-full p-2 border border-green-300 rounded-md"
      />
    )}
  </div>
);

export default function ViewCallReports({ patientName, onSubmit, onCancel }) {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState({
    callDate: "",
    callDuration: "",
    patientMood: "fghgfhgfhgfh",
    physicalHealth: "",
    mentalHealth: "",
    medicationAdherence: "",
    dietAdherence: "",
    exerciseAdherence: "",
    socialEngagement: "",
    concerns: "",
    actionsTaken: "",
    followUpNeeded: "Yes",
    followUpDetails: "",
    additionalNotes: "",
  });

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <header className="flex items-center mb-6">
        <button onClick={onCancel} className="mr-4">
          <ArrowLeft
            onClick={() => {
              navigate(-1);
            }}
            className="w-6 h-6 text-green-800"
          />
        </button>
        <h1 className="text-2xl font-bold text-green-800">
          View Call Details {patientName}
        </h1>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Call Date"
            type="date"
            value={reportData.callDate}
          />
          <InputField
            label="Call Duration (minutes)"
            type="number"
            value={reportData.callDuration}
          />
          <InputField
            label="Patient Mood"
            type="text"
            value={reportData.patientMood}
          />
          <InputField
            label="Physical Health"
            type="text"
            value={reportData.physicalHealth}
          />
          <InputField
            label="Mental Health"
            type="text"
            value={reportData.mentalHealth}
          />
          <InputField
            label="Medication Adherence"
            type="text"
            value={reportData.medicationAdherence}
          />
          <InputField
            label="Diet Adherence"
            type="text"
            value={reportData.dietAdherence}
          />
          <InputField
            label="Exercise Adherence"
            type="text"
            value={reportData.exerciseAdherence}
          />
        </div>

        <InputField
          label="Social Engagement"
          type="textarea"
          value={reportData.socialEngagement}
        />
        <InputField
          label="Concerns Raised"
          type="textarea"
          value={reportData.concerns}
        />
        <InputField
          label="Actions Taken"
          type="textarea"
          value={reportData.actionsTaken}
        />
        <InputField
          label="Follow-up Needed"
          type="text"
          value={reportData.followUpNeeded}
        />
        {reportData.followUpNeeded === "Yes" && (
          <InputField
            label="Follow-up Details"
            type="textarea"
            value={reportData.followUpDetails}
          />
        )}
        <InputField
          label="Additional Notes"
          type="textarea"
          value={reportData.additionalNotes}
        />
      </div>
    </div>
  );
}
