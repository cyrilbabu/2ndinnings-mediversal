import cloudinary from "../utils/cloudinary.js";
import Assignment from "../models/assignment.model.js";

export const getAssignment = async (req, res) => {
  try {
    const assignmentDetails = await Assignment.find({});
    if (!assignmentDetails) {
      return res
        .status(400)
        .json({ message: "error in fetching assignment details" });
    }

    return res.status(200).json({
      message: "fetched assignment details successfully",
      assignmentDetails,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "error in getAssignmet controller" });
  }
};

export const uploadAssignment = async (req, res) => {
  try {
    const { patient, staff, date, time, role } = req.body;
    const newAssignment = new Assignment({
      patient,
      staff,
      time,
      date,
      role,
    });

    const result = await newAssignment.save();
    if (!result) {
      return res.status(400).json({ message: "error in saving assignment" });
    }
    return res
      .status(200)
      .json({ message: " assignment saved successfully", newAssignment });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "error in uploadAssignment controller" });
  }
};

export const updateAssesment = async (req, res) => {
  try {
    const { id, assessment} = req.body;
    if (!req.files) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const photoUrls = req.files.map(file => file.path);

    const update = {
      photos: photoUrls,
      assessment:assessment
   };

   const result = await Assignment.findByIdAndUpdate(id, update, {
    new: true,
  });
  if (!result) {
    return res.status(400).json({ message: "Assignment not found" });
  }
  return res.status(200).json({ message: "Assessment updated successfully" ,result }); 
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "Error in updateAssessment controller" });
  }
};
