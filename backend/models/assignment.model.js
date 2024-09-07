import mongoose from "mongoose";


const assignmentSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.Mixed,
    },
    staff: {
      type: mongoose.Schema.Types.Mixed,
    },
    time: {
      type: String,
      required: true,
    },
    date:{
      type:String,
      required:true
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Not Completed", "Completed"],
      default: "Not Completed",
    },
    assessment: {
      type: mongoose.Schema.Types.Mixed,
    },
    photos: {

      type: [String], // Changed to an array of strings

    },
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
