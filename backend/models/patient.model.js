import { timeStamp } from "console";
import mongoose from "mongoose";

const patientSchema = mongoose.Schema(
  {
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
      enum: ["Basic", "Advance", "premium"],
      required: true,
    },

    planDuration: {
      type: String,
    },


    dob: {
      type: Date,
      required: true,
    },
    emergencyContact: {
      type: Number,
      required: true,
    },
    healthCondition: {
      type: String,
    },

    careManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },

  },
  { timestamps: true }
);

const Patient = new mongoose.model("Patient", patientSchema);

export default Patient;
