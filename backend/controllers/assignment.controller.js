import Assignment from "../models/assignment.model.js";
import cloudinary from "../utils/cloudinary.js";

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
    const { id, assessment } = req.body;
    // console.log("ID:", id);
    // console.log("Assessment:", assessment);
    // console.log("Photos metadata:", photos); // Logging photo metadata

    // // Assuming req.files contains the uploaded files
    // const uploadedPhotos = await Promise.all(
    //   req.files.map(async (file) => {
    //     const result = await cloudinary.uploader.upload(file.path);
    //     return result.secure_url; // URL of the uploaded file
    //   })
    // );

    // console.log("Uploaded Photo URLs:", uploadedPhotos);

    // const photoLinks = req.files.map((file) => file.path);
    // assessment.photos = photoLinks; // Assuming you want to store the photos in assessment

    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(400).json({ message: "error in fetching assessment" });
    }
    assignment.assessment = assessment;
    assignment.status = "Completed";
    const result = await assignment.save();
    if (!result) {
      return res.status(400).json({ message: "error in saving assessment" });
    }
    return res
      .status(200)
      .json({ message: " assessment saved successfully", assignment });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "error in updateAssessment controller" });
  }
};
