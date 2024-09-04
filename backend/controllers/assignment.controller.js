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
    const { id, assessment } = req.body;
    // const photoes_Link = assessment.photos.map(
    //   (photo) => (photo = req.file.path)
    // );
    // assignment.photos = photoes.link;

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
