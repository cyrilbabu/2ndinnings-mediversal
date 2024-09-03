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
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
