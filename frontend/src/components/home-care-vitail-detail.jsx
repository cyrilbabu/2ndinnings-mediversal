import React from "react";
import {
  Activity,
  ArrowLeft,
  Droplet,
  Heart,
  Link,
  Sandwich,
  Scale,
  Thermometer,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAssignmentById } from "../query/useAssignmentById";

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
  const { id } = useParams();
  const { isLoading, assignment } = useAssignmentById(id);
  console.log(assignment);

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

      pdf.save(`${report}l-report.pdf`);
    });
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-green-50">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-green-500"></div>
        <span className="ml-2 text-green-800">Loading...</span>
      </div>
    );
  }

  const report = JSON.parse(assignment.assessment);

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
          <div>{assignment.patient.fullName}</div>
          <div>
            {"Date: "}
            {assignment.updatedAt.split("T")[0]} {"Time:"} {assignment.time}
          </div>
        </h2>

        <form>
          <VitalInput
            icon={Activity}
            label="Blood Pressure"
            unit="mmHg"
            value={report.bloodPressure}
            name="bloodPressure"
          />
          <VitalInput
            icon={Heart}
            label="Heart Rate"
            unit="bpm"
            value={report.heartRate}
            name="heartRate"
          />
          <VitalInput
            icon={Thermometer}
            label="Temperature"
            unit="°F"
            value={report.temperature}
            name="temperature"
          />
          <VitalInput
            icon={Droplet}
            label="Oxygen Saturation"
            unit="%"
            value={report.oxygenSaturation}
            name="oxygenSaturation"
          />
          <VitalInput
            icon={Activity}
            label="Respiratory Rate"
            unit="breaths/min"
            value={report.respiratoryRate}
            name="respiratoryRate"
          />
          <VitalInput
            icon={Scale}
            label="Weight"
            unit="kg"
            value={report.weight}
            name="weight"
          />
          <VitalInput
            icon={Sandwich}
            label="Blood Sugar"
            unit="mg/dL"
            value={report.bloodSugar}
            name="bloodSugar"
          />
          <label className="block text-sm font-medium text-green-800 mb-1">
            Photos
          </label>
          <div className="flex flex-wrap">
            {assignment.photos.map((photo) => (
              <img
                onClick={() => (window.location.href = photo)}
                className="w-1/6 p-2"
                src={photo}
                alt="assignment photo"
              />
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-green-800 mb-1">
              Additional Notes
            </label>
            <textarea
              className="w-full p-2 border border-green-300 rounded-md"
              rows="4"
              value={report.finalReport}
              readOnly
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}
