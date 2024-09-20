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

export default function ViewCallReports({ data, setDataIndex }) {
  const navigate = useNavigate();

  return (
    <>
      <div className=" bg-green-50 rounded h-[80vh] w-8/12 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Call Date"
              type="date"
              value={data.reportData.callDate}
            />
            <InputField
              label="Call Duration (minutes)"
              type="number"
              value={data.reportData.callDuration}
            />
            <InputField
              label="Patient Mood"
              type="text"
              value={data.reportData.patientMood}
            />
            <InputField
              label="Physical Health"
              type="text"
              value={data.reportData.physicalHealth}
            />
            <InputField
              label="Mental Health"
              type="text"
              value={data.reportData.mentalHealth}
            />
            <InputField
              label="Medication Adherence"
              type="text"
              value={data.reportData.medicationAdherence}
            />
            <InputField
              label="Diet Adherence"
              type="text"
              value={data.reportData.dietAdherence}
            />
            <InputField
              label="Exercise Adherence"
              type="text"
              value={data.reportData.exerciseAdherence}
            />
          </div>

          <InputField
            label="Social Engagement"
            type="textarea"
            value={data.reportData.socialEngagement}
          />
          <InputField
            label="Concerns Raised"
            type="textarea"
            value={data.reportData.concerns}
          />
          <InputField
            label="Actions Taken"
            type="textarea"
            value={data.reportData.actionsTaken}
          />
          <InputField
            label="Follow-up Needed"
            type="text"
            value={data.reportData.followUpNeeded}
          />
          {data.reportData.followUpNeeded === "Yes" && (
            <InputField
              label="Follow-up Details"
              type="textarea"
              value={data.reportData.followUpDetails}
            />
          )}
          <InputField
            label="Additional Notes"
            type="textarea"
            value={data.reportData.additionalNotes}
          />
        </div>
      </div>
    </>
  );
}
