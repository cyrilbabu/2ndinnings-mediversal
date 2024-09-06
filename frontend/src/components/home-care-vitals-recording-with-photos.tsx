import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  Heart,
  Activity,
  Thermometer,
  Droplet,
  Send,
  Scale,
  Sandwich,
  Camera,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateAssessment } from "../query/useUpdateAssessment";

const VitalInput = ({
  icon: Icon,
  label,
  unit,
  placeholder,
  name,
  register,
  errors,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-green-800 mb-1">
      {label}
    </label>
    <div className="flex items-center bg-white rounded-md border border-green-300">
      <Icon className="text-green-600 w-5 h-5 ml-3" />
      <input
        type="text"
        placeholder={placeholder}
        className="flex-grow p-2 outline-none"
        {...register(name, { required: "This field is required" })}
      />
      <span className="text-gray-600 mr-3">{unit}</span>
    </div>
    {errors[name] && (
      <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>
    )}
  </div>
);

const PhotoUpload = ({ photos, errors }) => {

  const [image, setImage] = useState([]);

  
  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files) {
      setImage(files)}
    else
      setImage(null);
    }
    const newPhotos = files.map((file) => URL.createObjectURL(file));
    setImage((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const removePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-green-800 mb-1">
        Visit Photos
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <img
              src={photo}
              alt={`Visit photo ${index + 1}`}
              className="w-20 h-20 object-cover rounded-md"
            />
            <button
              onClick={() => removePhoto(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="flex items-center justify-center w-full py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition duration-300"
      >
        <Camera className="w-5 h-5 mr-2" />
        Add Photo
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        multiple
        className="hidden"
      />
      {/* {errors.photos && (
        <p className="text-red-500 text-xs mt-1">{errors.photos.message}</p>
      )} */}
    </div>
  );
;

export default function VitalsRecordingScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const { updateAssignementDetails, isLoading } = useUpdateAssessment();
  

  const onSubmit = (data) => {
    if (photos.length === 0) {
      setError("photos", { message: "Please upload at least one photo." });
      return;
    }
    updateAssignementDetails(
      {
        id: id,
        assessment: { ...data, photos },
      },
      {
        onSucess: () => {
          navigate("/homecare-dashboard");
        },
      }
    );
  };

  

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <header className="flex items-center mb-6">
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowLeft className="w-6 h-6 text-green-800 mr-2" />
        </button>
        <h1 className="text-2xl font-bold text-green-800">Record Vitals</h1>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          John Doe - 10:00 AM Visit
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VitalInput
            icon={Activity}
            label="Blood Pressure"
            unit="mmHg"
            placeholder="120/80"
            register={register}
            name="bloodPressure"
            errors={errors}
          />
          <VitalInput
            icon={Heart}
            label="Heart Rate"
            unit="bpm"
            placeholder="70"
            register={register}
            name="heartRate"
            errors={errors}
          />
          <VitalInput
            icon={Thermometer}
            label="Temperature"
            unit="°F"
            placeholder="98.6"
            register={register}
            name="temperature"
            errors={errors}
          />
          <VitalInput
            icon={Droplet}
            label="Oxygen Saturation"
            unit="%"
            placeholder="98"
            register={register}
            name="oxygenSaturation"
            errors={errors}
          />
          <VitalInput
            icon={Activity}
            label="Respiratory Rate"
            unit="breaths/min"
            placeholder="16"
            register={register}
            name="respiratoryRate"
            errors={errors}
          />
          <VitalInput
            icon={Scale}
            label="Weight"
            unit="kg"
            placeholder="70"
            register={register}
            name="weight"
            errors={errors}
          />
          <VitalInput
            icon={Sandwich}
            label="Blood Sugar"
            unit="mg/dL"
            placeholder="100"
            register={register}
            name="bloodSugar"
            errors={errors}
          />

          <PhotoUpload photos={photos} errors={errors} />
     
          <div className="mb-4">
            <label className="block text-sm font-medium text-green-800 mb-1">
              Additional Notes
            </label>
            <textarea
              className="w-full p-2 border border-green-300 rounded-md"
              rows="4"
              placeholder="Enter any additional observations or notes here..."
              {...register("finalReport", {
                required: "This field is required",
              })}
            ></textarea>
            {errors.finalReport && (
              <p className="text-red-500 text-xs mt-1">
                {errors.finalReport?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center"
          >
            <Send className="w-5 h-5 mr-2" />
            Complete Visit
          </button>
        </form>
      </div>
    </div>
  );
}
