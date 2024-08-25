import React from "react";
import { Search, UserPlus, Users, LogOut } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import BackButton from "../UI/back-button";

const DashboardCard = ({
  title,
  icon: Icon,
  description,
  linkText,
  onClick,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
    <Icon className="w-12 h-12 text-green-600 mb-4" />
    <h2 className="text-xl font-semibold text-green-800 mb-2">{title}</h2>
    <p className="text-gray-600 mb-4">{description}</p>
    <button
      onClick={onClick}
      className="mt-auto bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
    >
      {linkText}
    </button>
  </div>
);

const StatCard = ({ value, label }) => (
  <div className="bg-white p-4 rounded-lg shadow-md text-center">
    <div className="text-3xl font-bold text-green-600 mb-1">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

export default function FrontDeskDashboard() {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen bg-green-50">
        <header className="bg-green-800 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">2nd Innings - Front Desk</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, Sarah</span>
            <LogOut
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <DashboardCard
              title="Search Members"
              icon={Search}
              description="Look up member information quickly and easily."
              linkText="Search Now"
              onClick={null}
            />
            <DashboardCard
              title="New Registration"
              icon={UserPlus}
              description="Register new members and set up their profiles."
              linkText="Register"
              onClick={() => {
                navigate("/patient-new-registration");
              }}
            />
            <DashboardCard
              title="View Member Details"
              icon={Users}
              description="Access comprehensive member information and benefits."
              linkText="View Members"
              onClick={() => {
                navigate("/show-all-member");
              }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value="1,234" label="Total Members" />
            <StatCard value="56" label="New This Month" />
            <StatCard value="23" label="Appointments Today" />
            <StatCard value="7" label="Renewals Due" />
          </div>
        </main>
      </div>
    </>
  );
}
