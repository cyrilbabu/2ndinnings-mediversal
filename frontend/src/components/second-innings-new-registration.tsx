import React, { useState } from "react";
import { User, Phone, Mail, Home, AlertTriangle } from "lucide-react";
import axios from "axios";
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
        onChange={onChange}
        className="w-full outline-none text-green-800"
      />
    </div>
  </div>
);

export default function NewRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    plan: "",
    plantime: "",
    healthCondition: "", // Updated key
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
    console.log(formData);

    try {
      await axios.post("http://localhost:3000/api/patient/register", formData);
      // alert("Registration successful!");
      setFormData({
        fullName: "",
        dob: "",
        phone: "",
        email: "",
        address: "",
        emergencyContact: "",
        plan: "",
        plantime: "",
        healthCondition: "", // Reset key
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
              icon={Mail}
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
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
              <label className="block text-green-800 mb-2">
                Membership Plan
              </label>
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
              <div className="flex space-x-4">
                {["Monthly", "Yearly"].map((plantime) => (
                  <label key={plantime} className="flex items-center">
                    <input
                      type="radio"
                      name="plantime"
                      value={plantime}
                      checked={formData.plantime === plantime}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>{plantime}</span>
                  </label>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                navigate("/view-all-plans");
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
            disabled={isLoading}
          >
            {isLoading ? (
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
