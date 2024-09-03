import React from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  User,
  MapPin,
  Phone,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const VisitCard = ({ name, address, phone, time, status, navigate }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold text-green-800">{name}</h3>
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          status === "Upcoming"
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
      <Phone className="w-4 h-4 mr-2" />
      {phone}
    </div>
    <div className="flex items-center text-gray-600 text-sm">
      <Clock className="w-4 h-4 mr-2" />
      {time}
    </div>
    {status === "Upcoming" ? (
      <button
        onClick={() => {
          navigate("/home-care-vitals");
        }}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
      >
        Start Visit
      </button>
    ) : (
      <button
        onClick={() => {
          navigate("/home-care-vitals");
        }}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
      >
        Download Report
      </button>
    )}
  </div>
);

export default function HomeCareStaffDashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-800">
          Home Care Dashboard
        </h1>
        <div className="flex items-center">
          <User className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-green-800 mr-4">Welcome, Sarah</span>
          <LogOut
            className="w-5 h-5 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
      </header>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          Today's Visits
        </h2>
        <VisitCard
          name="John Doe"
          address="123 Elder St, Senior City"
          phone="(555) 123-4567"
          time="10:00 AM"
          status="Upcoming"
          navigate={navigate}
        />
        <VisitCard
          name="Jane Smith"
          address="456 Wellness Ave, Care Town"
          phone="(555) 987-6543"
          time="2:00 PM"
          status="Upcoming"
          navigate={navigate}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          Completed Visits
        </h2>
        <VisitCard
          name="Robert Brown"
          address="789 Serenity Ln, Peaceful Village"
          phone="(555) 246-8135"
          time="9:00 AM"
          status="Completed"
        />
      </div>
    </div>
  );
}
