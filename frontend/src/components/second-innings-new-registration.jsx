import React, { useEffect, useState } from "react";
import { User, Phone, Mail, Home, AlertTriangle } from "lucide-react";
import axios from "axios";
import BackButton from "../UI/back-button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { url } from "../services/url";
import { useAllPatient } from "../query/useAllPatient";
import { useRegisterPatient } from "../query/useRegisterPatient";

const InputField = ({
  icon: Icon,
  label,
  name,
  type = "text",
  value,
  onChange,
  className,
  disabled = false,
}) => (
  <div className="flex items-center bg-white rounded-lg shadow-sm p-2 mb-4">
    <Icon className="text-green-600 w-5 h-5 mr-2" />
    <div className="flex-grow">
      <label className="text-sm text-green-800 block">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full outline-none ${className} text-green-800`}
      />
    </div>
  </div>
);

export default function NewRegistration() {
  const [id, setMemberId] = useState("");
  const { registerPatient, isLoading: registerLoading } = useRegisterPatient();
  const { isLoading: loading, allPatient: patients } = useAllPatient();
  console.log(id);

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    plan: "",
    planDuration: "",
    healthCondition: "",
    emergencyEmail: "",
    emergencyName: "",
    gender: "",
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    navigate("/frontdesk-dashboard");
    registerPatient(
      { ...formData, memberId: id },
      {
        onSuccess: () => {
          setFormData({
            fullName: "",
            dob: "",
            phone: "",
            email: "",
            address: "",
            emergencyContact: "",
            plan: "",
            planDuration: "",
            healthCondition: "",
            emergencyEmail: "",
            emergencyName: "",
            gender,
          });
        },
      }
    );
  };

  useEffect(() => {
    function createMemberID() {
      if (patients.length==0) {
        const date = new Date();
        const year = date.getFullYear();
        setMemberId(() => `MHPL 2INN ${year} 0001`);
      }
      else{
        const latestPatient = patients?.reduce((latest, current) => {
          return new Date(current.createdAt) > new Date(latest.createdAt)
            ? current
            : latest;
        });

        const serial = latestPatient?.memberId.split(" ")[3];
        const no = parseInt(serial, 10) + 1;
        const fourDigitString = no.toString().padStart(4, "0");
        const date = new Date();
        const year = date.getFullYear();
        // const serial = "0001";
        setMemberId(() => `MHPL 2INN ${year} ${fourDigitString}`)
    
      }

    }

    createMemberID();
  }, [patients]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-green-50">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-green-500"></div>
        <span className="ml-2 text-green-800">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <BackButton />
      <div className="min-h-screen bg-green-50 p-6">
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          New Member Registration
        </h1>
        <form
          className="bg-white rounded-lg shadow-md p-6"
          onSubmit={handleSubmit}
        >
          <InputField
            icon={User}
            label="Member ID:"
            disabled={true}
            name="memberId"
            value={id}
            className="cursor-not-allowed text-slate-400 py-1 px-2 rounded-lg"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              icon={User}
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            <InputField
              icon={User}
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleInputChange}
            />
            <InputField
              icon={Phone}
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <InputField
              icon={AlertTriangle}
              label="Emergency Name"
              name="emergencyName"
              type="text"
              value={formData.emergencyName}
              onChange={handleInputChange}
            />
            <InputField
              icon={Mail}
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputField
              icon={AlertTriangle}
              label="Emergency Email"
              name="emergencyEmail"
              type="email"
              value={formData.emergencyEmail}
              onChange={handleInputChange}
            />
            <InputField
              icon={Home}
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            <InputField
              icon={AlertTriangle}
              label="Emergency Contact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-6  md:flex justify-between">
            <div>
              <label className="block text-green-800 mb-2 ">Gender</label>
              <div className="flex space-x-4">
                {["Male", "Female", "Others"].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>{gender}</span>
                  </label>
                ))}
              </div>
              <label className="block text-green-800 mb-2 ">Plan Details</label>
              <div className="flex space-x-4">
                {["Basic", "Advance", "Premium"].map((plan) => (
                  <label key={plan} className="flex items-center">
                    <input
                      type="radio"
                      name="plan"
                      value={plan}
                      checked={formData.plan === plan}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>{plan}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-green-800 mb-2">
                  Plan Duration
                </label>
                <div className="flex space-x-4">
                  {["monthly", "yearly"].map((planDuration) => (
                    <label key={planDuration} className="flex items-center">
                      <input
                        type="radio"
                        name="planDuration"
                        value={planDuration}
                        checked={formData.planDuration === planDuration}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>{planDuration}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                navigate("/frontdesk-dashboard/view-all-plans");
              }}
              className="md:mt-10 mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
            >
              View Plans
            </button>
          </div>

          <div className="mt-6">
            <label className="block text-green-800 mb-2">
              Health Condition
            </label>
            <textarea
              className="w-full h-24 p-2 border border-green-300 rounded-md"
              placeholder="List any existing health conditions..."
              name="healthCondition"
              value={formData.healthCondition}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
            disabled={registerLoading}
          >
            {registerLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mx-auto"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Register Member"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
