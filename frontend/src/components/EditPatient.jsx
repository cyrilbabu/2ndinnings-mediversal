import React, { useEffect, useState } from "react";
import { User, Phone, Mail, Home, AlertTriangle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../UI/back-button";

import { useEditPatient } from "../query/useEditPatient";
import { usePatient } from "../query/usePatient";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const InputField = ({
  icon: Icon,
  label,
  name,
  type = "text",
  value,
  onChange,
  className,
  disabled = false,
  register,
  errors,
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
        {...register(name, { required: `${label} is required` })}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  </div>
);

export default function EditPatient() {
  const { id } = useParams();
  const { patient } = usePatient(id);
  const { editPatient, isLoading } = useEditPatient(id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (patient) {
      const formattedDate = new Date(patient.dob).toISOString().split("T")[0];
      setValue("fullName", patient.fullName || "");
      setValue("dob", formattedDate || "");
      setValue("phone", patient.phone || "");
      setValue("email", patient.email || "");
      setValue("address", patient.address || "");
      setValue("emergencyContact", patient.emergencyContact || "");
      setValue("plan", patient.plan || "");
      setValue("planDuration", patient.planDuration || "");
      setValue("healthCondition", patient.healthCondition || "");
      setValue("emergencyEmail", patient.emergencyEmail || "");
      setValue("emergencyName", patient.emergencyName || "");
      setValue("gender", patient.gender || "");
    }
  }, [patient, setValue]);

  const onSubmit = (data) => {
    const updatedData = { id, data }; // Include the patient id in the data
    console.log(updatedData);

    // editPatient(updatedData, {
    //   onSuccess: () => {
    //     toast.success("Patient Updated Successfully");
    //     navigate(`/admin-dashboard/member-detail/${id}`);
    //   },
    //   onError: () => {
    //     toast.error("Error updating patient.");
    //   },
    // });
  };

  if (!patient) {
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
          Edit Member Details
        </h1>
        <form
          className="bg-white rounded-lg shadow-md p-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            icon={User}
            label="Full Name"
            name="fullName"
            register={register}
            errors={errors}
          />
          <InputField
            icon={User}
            label="Date of Birth"
            name="dob"
            type="date"
            register={register}
            errors={errors}
          />
          <InputField
            icon={Phone}
            label="Phone Number"
            name="phone"
            type="tel"
            register={register}
            errors={errors}
          />
          <InputField
            icon={Mail}
            label="Email Address"
            name="email"
            type="email"
            register={register}
            errors={errors}
          />
          <InputField
            icon={AlertTriangle}
            label="Emergency Contact"
            name="emergencyContact"
            register={register}
            errors={errors}
          />
          <InputField
            icon={Home}
            label="Address"
            name="address"
            register={register}
            errors={errors}
          />

          {/* Gender Radio Button */}
          <div>
            <label className="block text-green-800 mb-2">Gender</label>
            <div className="flex space-x-4">
              {["Male", "Female", "Others"].map((genderOption) => (
                <label key={genderOption} className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={genderOption}
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                  />
                  <span>{genderOption}</span>
                </label>
              ))}
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          {/* Plan and Plan Duration Radio Button */}
          <div>
            <label className="block text-green-800 mb-2">Plan</label>
            <div className="flex space-x-4">
              {["Basic", "Advance", "Premium"].map((planOption) => (
                <label key={planOption} className="flex items-center">
                  <input
                    type="radio"
                    name="plan"
                    value={planOption}
                    {...register("plan", {
                      required: "Plan is required",
                    })}
                  />
                  <span>{planOption}</span>
                </label>
              ))}
            </div>
            {errors.plan && (
              <p className="text-red-500 text-sm">{errors.plan.message}</p>
            )}
          </div>

          <div>
            <label className="block text-green-800 mb-2">Plan Duration</label>
            <div className="flex space-x-4">
              {["monthly", "yearly"].map((planDuration) => (
                <label key={planDuration} className="flex items-center">
                  <input
                    type="radio"
                    name="planDuration"
                    value={planDuration}
                    {...register("planDuration", {
                      required: "Plan Duration is required",
                    })}
                  />
                  <span>{planDuration}</span>
                </label>
              ))}
            </div>
            {errors.planDuration && (
              <p className="text-red-500 text-sm">
                {errors.planDuration.message}
              </p>
            )}
          </div>

          <div className="mt-6">
            <label className="block text-green-800 mb-2">
              Health Condition
            </label>
            <textarea
              className="w-full h-24 p-2 border border-green-300 rounded-md"
              placeholder="List any existing health conditions..."
              {...register("healthCondition", {
                required: "Health Condition is required",
              })}
            ></textarea>
            {errors.healthCondition && (
              <p className="text-red-500 text-sm">
                {errors.healthCondition.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Update Changes
          </button>
        </form>
      </div>
    </>
  );
}
