import mongoose from "mongoose";

const benefitAvailabilitySchema = mongoose.Schema({
  annualBasicHealthCheckupPackage_58Parameters: {
    type: Number,
    default: 0,
  },
  generalPhysicianDoctorConsultation_InPersonatHome: {
    type: Number,
    default: 0,
  },
  generalPhysicianDoctorConsultation_Virtual: { type: Number, default: 0 },
  superSpecialistConsultation: { type: Number, default: 0 },
  wellnessCallCheckbyMPG: { type: Number, default: 0 },
  vitalCheckatHome: { type: Number, default: 0 },
  BLSEmergencyAmbulanceEvacuationCoverage: { type: Number, default: 0 },
  freeDentalAndEyeCheckup: { type: Number, default: 0 },
});

const patientSchema = mongoose.Schema(
  {
    memberId: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      enum: ["Basic", "Advance", "Premium"],
      required: true,
    },

    planDuration: {
      type: String,
      enum: ["yearly", "monthly"],
    },

    dob: {
      type: Date,
      required: true,
    },
    emergencyContact: {
      type: Number,
      required: true,
    },
    emergencyName: {
      type: String,
      required: true,
    },
    emergencyEmail: {
      type: String,
      required: true,
    },
    healthCondition: {
      type: String,
    },

    careManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    callDetails: [
      {
        type: mongoose.Schema.Types.Mixed,
        default: [],
      },
    ],
    benefits: {
      type: benefitAvailabilitySchema,
      default: () => ({}),  // Ensure an empty object is assigned by default
    },
  },
  { timestamps: true }
);

const Patient = new mongoose.model("Patient", patientSchema);

export default Patient;
