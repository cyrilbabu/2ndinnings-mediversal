import cloudinary from "../utils/cloudinary.js";
import Assignment from "../models/assignment.model.js";
import getDataUri from "../utils/datauri.js";

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



export const updateAssessment = async (req, res) => {
  try {
    const { id, assessment } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    // Process multiple files
    const uploadPromises = req.files.map(async (file) => {
      const dataUri = getDataUri(file);
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'assignments' // Optional: Specify a folder in Cloudinary
      });
      return result.secure_url;
    });

    // Upload all images and get their URLs
    const photoUrls = await Promise.all(uploadPromises);

    // Update the assignment document
    const update = {
      photos: photoUrls, // Set the photos field as an array of URLs
      assessment,
      status : "Completed"
    };

    const updatedAssignment = await Assignment.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!updatedAssignment) {
      return res.status(400).json({ message: "Assignment not found" });
    }

    return res.status(200).json({ message: "Assessment updated successfully", updatedAssignment });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Error in updateAssessment controller" });
  }
};
