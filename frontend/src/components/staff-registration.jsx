import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Phone, Key } from "lucide-react";
import BackButton from "../UI/back-button";
import axios from "axios";
import { toast } from "react-hot-toast";

const InputField = ({
  icon: Icon,
  label,
  name,
  type,
  value,
  onChange,
  register,
  errors,
}) => (
  <div className="items-center bg-white rounded-lg shadow-sm p-2 mb-4">
    <div className="flex">
      <Icon className="text-green-600 mt-3 mr-2" />
      <div className="flex-grow">
        <label className="text-sm text-green-800 block">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full outline-none text-green-800"
          {...register(name, { required: "This field is required" })}
        />
      </div>
    </div>
    {errors[name] && (
      <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>
    )}
  </div>
);

export default function StaffRegistration() {
  const options = [
    "Admin",
    "Front Desk",
    "Assessor",
    "Care Manager",
    "Home Care Staff",
  ];
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function checksubmit(data) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/staff/signup",
        data
      );
      console.log("Response:", response.data);
      toast.success("Staff Created successfully!");
    } catch (err) {
      if (err.response.data.error === "Staff member already exists") {
        toast.error(
          "Username already exists. Please choose a different username."
        );
      } else {
        toast.error("Error submitting form. Please try again.");
      }
      console.error("Error submitting form:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <BackButton />
      <div className="min-h-screen bg-green-50 p-6">
        <h1 className="text:xl md:text-3xl font-bold text-green-800 mb-6">
          New Staff Registration
        </h1>
        <form
          className="bg-white rounded-lg shadow-md p-6"
          onSubmit={handleSubmit(checksubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              icon={User}
              label="Full Name"
              name="name"
              type="text"
              register={register}
              errors={errors}
            />
            <InputField
              icon={User}
              label="Username"
              name="username"
              type="text"
              register={register}
              errors={errors}
            />
            <InputField
              icon={Phone}
              label="Phone Number"
              name="phone"
              type="number"
              register={register}
              errors={errors}
            />
            <InputField
              icon={Key}
              label="Password"
              name="password"
              type="password"
              register={register}
              errors={errors}
            />

            <div className="items-center bg-white rounded-lg shadow-sm p-2 mb-4">
              <label className="text-sm text-green-800 block mb-2">Role</label>
              <select
                name="role"
                className="w-full p-2 outline-none text-green-800 rounded-md border border-green-300"
                {...register("role", { required: "This field is required" })}
              >
                <option value="">Select Role</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.role?.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
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
              "Add Staff"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
