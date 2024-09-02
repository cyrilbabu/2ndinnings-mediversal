import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  User,
  Activity,
  Home,
  ClipboardList,
  Shield,
  Lock,
  Loader,
} from "lucide-react";
import { useLogin } from "../query/useLogin";

const BanyanBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="banyan-bg"
        x="0"
        y="0"
        width="100"
        height="100"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M0 50C20 50 20 40 40 40C60 40 60 50 80 50C100 50 100 40 120 40"
          stroke="#2F855A"
          strokeWidth="1"
          fill="none"
          strokeOpacity="0.3"
        />
        <path
          d="M0 55C20 55 20 65 40 65C60 65 60 55 80 55C100 55 100 65 120 65"
          stroke="#2F855A"
          strokeWidth="1"
          fill="none"
          strokeOpacity="0.3"
        />
        <circle cx="25" cy="10" r="3" fill="#2F855A" fillOpacity="0.2" />
        <circle cx="75" cy="20" r="4" fill="#2F855A" fillOpacity="0.2" />
        <circle cx="50" cy="30" r="2" fill="#2F855A" fillOpacity="0.2" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#banyan-bg)" />
  </svg>
);

const LoginButton = ({ role, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-start w-full px-6 py-4 mt-4 text-green-800 transition-all duration-300 bg-white bg-opacity-80 rounded-lg hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
  >
    <Icon className="w-6 h-6 mr-4" />
    <span className="text-lg font-semibold">Login as {role}</span>
  </button>
);

const AdminLoginButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-4 right-4 flex items-center px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-full hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
  >
    <Shield className="w-4 h-4 mr-2" />
    Admin Login
  </button>
);

const InputField = ({ icon: Icon, label, type = "text", value, onChange }) => (
  <div className="flex items-center bg-white rounded-lg shadow-sm p-2 mb-4 border">
    <Icon className="text-green-600 w-5 h-5 mr-2" />
    <div className="flex-grow">
      <label className="text-sm text-green-800 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required
        className="w-full outline-none text-green-800"
      />
    </div>
  </div>
);

const Login = ({ role }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();
  // console.log({ role, username: id, password });

  const handleSubmit = async () => {
    login(
      { username: id, password, role },
      {
        onSuccess: () => {
          if (role === "Admin") {
            navigate("/admin-dashboard");
          } else if (role === "Front Desk") {
            navigate("/frontdesk-dashboard");
          } else if (role === "Care Manager") {
            navigate("/care-manager-dashboard");
          } else if (role === "Home Care Staff") {
            navigate("/homecare-dashboard");
          } else if (role === "Assessor") {
            navigate("/assessor-dashboard");
          }
        },
      }
    );
  };

  return (
    <>
      <InputField
        icon={User}
        label="Enter Your ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <InputField
        icon={Lock}
        label="Enter Your Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="w-full px-6 py-2 mt-4 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader className="animate-spin w-5 h-5 mx-auto" />
        ) : (
          "Login"
        )}
      </button>
    </>
  );
};

export default function BanyanThemePageWithAdmin() {
  const [role, setRole] = useState("");
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-green-50 overflow-hidden">
      <BanyanBackground />
      {role === "" && (
        <AdminLoginButton
          onClick={() => {
            setRole("Admin");
          }}
        />
      )}
      <div className="relative w-full max-w-2xl p-8 bg-white bg-opacity-90 rounded-xl shadow-lg backdrop-blur-sm">
        <div className="text-center mb-4">
          <svg
            className="mx-auto w-20 h-20 text-green-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 18a5 5 0 0 0-10 0"></path>
            <line x1="12" y1="9" x2="12" y2="2"></line>
            <path d="M4.22 10a5 5 0 0 1 7.78-4.5"></path>
            <path d="M19.78 10a5 5 0 0 0-7.78-4.5"></path>
          </svg>
          <h1 className="mt-4 text-4xl font-bold text-green-800">
            2nd Innings Program
          </h1>
          <p className="mt-2 text-xl text-green-600">
            Elder Care Management System
          </p>
          {role !== "" && (
            <p className="mt-6 text-2xl font-bold text-green-900">
              Login As {role}
            </p>
          )}
        </div>

        {role !== "" ? (
          <Login role={role} />
        ) : (
          <div className="space-y-4">
            <LoginButton
              role="Front Desk"
              icon={Users}
              onClick={() => {
                setRole("Front Desk");
              }}
            />
            <LoginButton
              role="Care Manager"
              icon={Activity}
              onClick={() => {
                setRole("Care Manager");
              }}
            />
            <LoginButton
              role="Home Care Staff"
              icon={Home}
              onClick={() => {
                setRole("Home Care Staff");
              }}
            />
            <LoginButton
              role="Assessor"
              icon={ClipboardList}
              onClick={() => {
                setRole("Assessor");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
