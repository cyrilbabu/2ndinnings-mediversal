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

export const getAssignmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res
        .status(400)
        .json({ message: "error in fetching assignment details" });
    }

    return res.status(200).json({
      message: "fetched assignment details successfully",
      assignment,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "error in getAssignmet controller" });
  }
};

export const uploadAssignment = async (req, res) => {
  try {
    const { patient, staff, time, role, date } = req.body;
    const newAssignment = new Assignment({
      patient,
      staff,
      date,
      time,
      role,
    });
    console.log(newAssignment);

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
  let photoUrls = [];
  try {
    const { id, assessment } = req.body;
    if (req.files) {
      const uploadPromises = req.files.map(async (file) => {
        const dataUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(dataUri, {
          folder: "assignments", // Optional: Specify a folder in Cloudinary
        });
        return result.secure_url;
      });

      // Upload all images and get their URLs
      photoUrls = await Promise.all(uploadPromises);
    }
    // Process multiple files

    // Update the assignment document
    const update = {
      photos: photoUrls, // Set the photos field as an array of URLs
      assessment,
      status: "Completed",
    };

    const updatedAssignment = await Assignment.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!updatedAssignment) {
      return res.status(400).json({ message: "Assignment not found" });
    }

    return res
      .status(200)
      .json({ message: "Assessment updated successfully", updatedAssignment });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "Error in updateAssessment controller" });
  }
};
