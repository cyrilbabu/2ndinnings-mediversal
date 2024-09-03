import React from "react";
import {
  User,
  Phone,
  Mail,
  Home,
  AlertTriangle,
  Crown,
  Shield,
  Star,
} from "lucide-react";
import BackButton from "../UI/back-button";
import { useNavigate } from "react-router-dom";

const InputField = ({
  icon: Icon,
  label,
  name,
  type = "text",
  value,
  onChange,
}) => (
  <div className="flex items-center bg-white rounded-lg shadow-sm p-2 mb-4">
    <Icon className="text-green-600 w-5 h-5 mr-2" />
    <div className="flex-grow">
      <label className="text-sm text-green-800 block">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        readOnly
        className="w-full outline-none text-green-800"
      />
    </div>
  </div>
);

export default function ViewPatientDetails() {
  const patientData = {
    fullName: "Sahu the don",
    dob: "2001-07-25",
    phone: "9198563245",
    email: "sahuthedon@gmail.com",
    address: "Patna ",
    emergencyContact: "9287654321",
    healthCondition: "Mast Bindaas ekdum.",
    plan: "Premium",
    planDuration: "Yearly",
  };

  const planClass =
    patientData.plan === "Premium"
      ? "bg-[#FFD700] hover:bg-[#FFC700] text-black"
      : patientData.plan === "Advance"
      ? "bg-[#C0C0C0] hover:bg-[#A9A9A9] text-black"
      : patientData.plan === "Basic"
      ? "bg-[#CD7F32] hover:bg-[#B87333] text-black"
      : "bg-blue-600 hover:bg-blue-700"; // Default color

  const PlanIcon =
    patientData.plan === "Premium"
      ? Crown
      : patientData.plan === "Advance"
      ? Shield
      : Star;

  const navigate = useNavigate();

  return (
    <>
      <BackButton />
      <div className="min-h-screen bg-green-50 p-6">
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          View Patient Detail
        </h1>
        <form className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              icon={User}
              label="Full Name"
              name="fullName"
              value={patientData.fullName}
            />
            <InputField
              icon={User}
              label="Date of Birth"
              name="dob"
              type="date"
              value={patientData.dob}
            />
            <InputField
              icon={Phone}
              label="Phone Number"
              name="phone"
              type="tel"
              value={patientData.phone}
            />
            <InputField
              icon={Mail}
              label="Email Address"
              name="email"
              type="email"
              value={patientData.email}
            />
            <InputField
              icon={Home}
              label="Address"
              name="address"
              value={patientData.address}
            />
            <InputField
              icon={AlertTriangle}
              label="Emergency Contact"
              name="emergencyContact"
              value={patientData.emergencyContact}
            />
          </div>

          <div className="mt-6">
            <div>
              <label className="block text-green-800 mb-2">
                Membership Plan
              </label>
            </div>
            <div className="gap-4 flex">
              <button
                onClick={() => {
                  navigate("/view-all-plans");
                }}
                className={`md:mt-3 mt-4  flex  px-6 py-2 rounded-md transition duration-300 ${planClass}`}
              >
                <PlanIcon className="w-5 h-5 mr-2" />
                {patientData.plan} {patientData.planDuration}
              </button>
              <button
                onClick={() => {
                  navigate("/view-all-plans");
                }}
                className="md:mt-3 mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Expires in ....
              </button>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-green-800 mb-2">
              Health Condition
            </label>
            <textarea
              className="w-full h-24 p-2 border border-green-300 rounded-md"
              placeholder="List any existing health conditions..."
              readOnly
              name="healthCondition"
              value={patientData.healthCondition}
            ></textarea>
          </div>
        </form>
      </div>
    </>
  );
}
