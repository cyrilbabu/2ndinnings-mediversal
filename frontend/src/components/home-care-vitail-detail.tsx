import React from "react";
import {
  Activity,
  ArrowLeft,
  Droplet,
  Heart,
  Sandwich,
  Scale,
  Thermometer,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const VitalInput = ({ icon: Icon, label, unit, value }) => (
  <div className="mb-4">
    <div className="flex items-center justify-between h-12 bg-white rounded-md border border-green-300 px-3">
      <div className="flex items-center gap-2">
        <Icon className="text-green-600 w-5 h-5" />
        <label className="font-medium text-green-800">{label}</label>
      </div>
      <div className="flex items-center">
        <span className="text-gray-800">{`${value} ${unit}`}</span>
      </div>
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

  // Function to download the page content as a PDF
  const downloadPDF = () => {
    const content = document.getElementById("pdf-content");

    html2canvas(content, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Handling multiple pages
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${patientVitals.fullName}-vital-report.pdf`);
    });
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
        <button
          onClick={downloadPDF}
          className=" bg-green-600 text-white py-3 px-2 rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center"
        >
          Download Report
        </button>
      </header>

      <div id="pdf-content" className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl flex font-semibold text-green-800 mb-4 justify-between">
          <div>{patientVitals.fullName}</div>
          <div>{patientVitals.visitTime}</div>
        </h2>

        <form>
          <VitalInput
            icon={Activity}
            label="Blood Pressure"
            unit="mmHg"
            value={patientVitals.bloodPressure}
            name="bloodPressure"
          />
          <VitalInput
            icon={Heart}
            label="Heart Rate"
            unit="bpm"
            value={patientVitals.heartRate}
            name="heartRate"
          />
          <VitalInput
            icon={Thermometer}
            label="Temperature"
            unit="°F"
            value={patientVitals.temperature}
            name="temperature"
          />
          <VitalInput
            icon={Droplet}
            label="Oxygen Saturation"
            unit="%"
            value={patientVitals.oxygenSaturation}
            name="oxygenSaturation"
          />
          <VitalInput
            icon={Activity}
            label="Respiratory Rate"
            unit="breaths/min"
            value={patientVitals.respiratoryRate}
            name="respiratoryRate"
          />
          <VitalInput
            icon={Scale}
            label="Weight"
            unit="kg"
            value={patientVitals.weight}
            name="weight"
          />
          <VitalInput
            icon={Sandwich}
            label="Blood Sugar"
            unit="mg/dL"
            value={patientVitals.bloodSugar}
            name="bloodSugar"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-green-800 mb-1">
              Additional Notes
            </label>
            <textarea
              className="w-full p-2 border border-green-300 rounded-md"
              rows="4"
              value={patientVitals.finalReport}
              readOnly
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}
