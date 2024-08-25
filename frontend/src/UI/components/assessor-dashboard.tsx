/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  User,
  MapPin,
  FileText,
  AlertTriangle,
} from "lucide-react";

const VisitCard = ({
  name,
  address,
  date,
  time,
  assessmentType,
  status,
  onActionClick,
}) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold text-green-800">{name}</h3>
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          status === "Assigned"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        {status}
      </span>
    </div>
    <div className="flex items-center text-gray-600 text-sm mb-1">
      <MapPin className="w-4 h-4 mr-2" />
      {address}
    </div>
    <div className="flex items-center text-gray-600 text-sm mb-2">
      <Calendar className="w-4 h-4 mr-2" />
      {date} at {time}
    </div>
    <div className="flex items-center text-gray-600 text-sm mb-3">
      <FileText className="w-4 h-4 mr-2" />
      {assessmentType} Geriatric Assessment
    </div>
    <button
      onClick={onActionClick}
      className={`w-full py-2 rounded-md transition duration-300 flex items-center justify-center ${
        status === "Assigned"
          ? "bg-green-600 text-white hover:bg-green-700"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {status === "Assigned" ? "Start Assessment" : "View Assessment"}
    </button>
  </div>
);

export default function AssessorDashboard() {
  const [activeTab, setActiveTab] = useState("assigned");

  const assignedVisits = [
    {
      id: 1,
      name: "John Doe",
      address: "123 Elder St, Senior City",
      date: "2023-08-25",
      time: "10:00 AM",
      assessmentType: "Basic",
      status: "Assigned",
    },
    {
      id: 2,
      name: "Jane Smith",
      address: "456 Wellness Ave, Care Town",
      date: "2023-08-26",
      time: "2:00 PM",
      assessmentType: "Advanced",
      status: "Assigned",
    },
  ];

  const completedVisits = [
    {
      id: 3,
      name: "Robert Brown",
      address: "789 Serenity Ln, Peaceful Village",
      date: "2023-08-24",
      time: "11:30 AM",
      assessmentType: "Basic",
      status: "Completed",
    },
    {
      id: 4,
      name: "Emily White",
      address: "101 Tranquil Rd, Quiet Hamlet",
      date: "2023-08-23",
      time: "3:00 PM",
      assessmentType: "Advanced",
      status: "Completed",
    },
  ];

  const handleActionClick = (visit) => {
    // Here you would navigate to the appropriate assessment form or view
    console.log(
      `${visit.status === "Assigned" ? "Starting" : "Viewing"} assessment for ${
        visit.name
      }`
    );
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-800">
          Assessor Dashboard
        </h1>
        <div className="flex items-center">
          <User className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-green-800">Welcome, Dr. Anderson</span>
        </div>
      </header>

      <div className="mb-6 flex">
        <button
          className={`flex-1 py-2 px-4 ${
            activeTab === "assigned"
              ? "bg-green-600 text-white"
              : "bg-green-100 text-green-800"
          } rounded-l-md`}
          onClick={() => setActiveTab("assigned")}
        >
          Assigned Visits
        </button>
        <button
          className={`flex-1 py-2 px-4 ${
            activeTab === "completed"
              ? "bg-green-600 text-white"
              : "bg-green-100 text-green-800"
          } rounded-r-md`}
          onClick={() => setActiveTab("completed")}
        >
          Completed Visits
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          {activeTab === "assigned"
            ? "Upcoming Assessments"
            : "Recent Assessments"}
        </h2>
        {activeTab === "assigned"
          ? assignedVisits.map((visit) => (
              <VisitCard
                key={visit.id}
                {...visit}
                onActionClick={() => handleActionClick(visit)}
              />
            ))
          : completedVisits.map((visit) => (
              <VisitCard
                key={visit.id}
                {...visit}
                onActionClick={() => handleActionClick(visit)}
              />
            ))}
      </div>
    </div>
  );
}
