import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  Heart,
  Activity,
  Thermometer,
  Droplet,
  Send,
  Scale,
  Sandwich,
  Camera,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const VitalInput = ({ icon: Icon, label, unit, placeholder, name, value }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-green-800 mb-1">
      {label}
    </label>
    <div className="flex items-center bg-white rounded-md border border-green-300">
      <Icon className="text-green-600 w-5 h-5 ml-3" />
      <input
        type="text"
        placeholder={placeholder}
        className="flex-grow p-2 outline-none"
        value={value}
        readOnly
      />
      <span className="text-gray-600 mr-3">{unit}</span>
    </div>
  </div>
);

export default function HomeCareVitalDetails() {
  const navigate = useNavigate();

  const patientVitals = {
    fullName: "Priyanshu",
    visitTime: "12/08/2024 - 10:00 AM",
    bloodPressure: "120/80",
    heartRate: 72,
    temperature: 98.6,
    oxygenSaturation: 97,
    respiratoryRate: 18,
    weight: 70,
    bloodSugar: 105,
    finalReport:
      "Patient is stable with normal vitals. Blood pressure slightly elevated but within acceptable range. No signs of distress observed.",
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <header className="flex justify-between items-center mb-2">
        <div className="flex x">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeft className="w-6 h-6 text-green-800 mr-2" />
          </button>
          <h1 className="text-2xl font-bold text-green-800">
            Patient Vital Details
          </h1>
        </div>
        <button className=" bg-green-600 text-white py-3 px-2 rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center">
          Download Report
        </button>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl flex font-semibold text-green-800 mb-4 justify-between">
          <div>{patientVitals.fullName}</div>{" "}
          <div>{patientVitals.visitTime}</div>
        </h2>

        <form>
          <VitalInput
            icon={Activity}
            label="Blood Pressure"
            unit="mmHg"
            placeholder="120/80"
            value={patientVitals.bloodPressure}
            name="bloodPressure"
          />
          <VitalInput
            icon={Heart}
            label="Heart Rate"
            unit="bpm"
            placeholder="70"
            // register={register}
            value={patientVitals.heartRate}
            name="heartRate"
            // errors={errors}
          />
          <VitalInput
            icon={Thermometer}
            label="Temperature"
            unit="°F"
            placeholder="98.6"
            // register={register}
            value={patientVitals.temperature}
            name="temperature"
            // errors={errors}
          />
          <VitalInput
            icon={Droplet}
            label="Oxygen Saturation"
            unit="%"
            placeholder="98"
            // register={register}
            value={patientVitals.oxygenSaturation}
            name="oxygenSaturation"
            // errors={errors}
          />
          <VitalInput
            icon={Activity}
            label="Respiratory Rate"
            unit="breaths/min"
            placeholder="16"
            // register={register}
            value={patientVitals.respiratoryRate}
            name="respiratoryRate"
            // errors={errors}
          />
          <VitalInput
            icon={Scale}
            label="Weight"
            unit="kg"
            placeholder="70"
            // register={register}
            value={patientVitals.weight}
            name="weight"
            // errors={errors}
          />
          <VitalInput
            icon={Sandwich}
            label="Blood Sugar"
            unit="mg/dL"
            placeholder="100"
            // register={register}
            value={patientVitals.bloodSugar}
            name="bloodSugar"
            // errors={errors}
          />

          {/* <PhotoUpload photos={photos} setPhotos={setPhotos} errors={errors} /> */}

          <div className="mb-4">
            <label className="block text-sm font-medium text-green-800 mb-1">
              Additional Notes
            </label>
            <textarea
              className="w-full p-2 border border-green-300 rounded-md"
              rows="4"
              placeholder="Enter any additional observations or notes here..."
              value={patientVitals.finalReport}
              readOnly
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}
