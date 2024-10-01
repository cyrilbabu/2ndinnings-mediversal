import mongoose from "mongoose";

const staffSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    notificationToken: {
      type: String,
      default : ""
    },
    role: {
      type: String,
      enum: [
        "Front Desk",
        "Care Manager",
        "Home Care Staff",
        "Assessor",
        "Admin",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Staff = new mongoose.model("Staff", staffSchema);

export default Staff;
