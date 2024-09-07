import Patient from "../models/patient.model.js"; // Adjust the path as needed
import Staff from "../models/staff.model.js";
// Register a new patient
export const registerPatient = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      plan,
      planDuration,
      dob,
      emergencyContact,
      healthCondition,
      emergencyName,
      emergencyEmail,
      memberId,
      gender,
      benefits
    } = req.body;

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already registered" });
    }

    // Create new patient
    const patient = new Patient({
      fullName,
      email,
      phone,
      address,
      plan,
      planDuration,
      dob,
      emergencyContact,
      healthCondition,
      emergencyName,
      emergencyEmail,
      gender,
      memberId,
      benefits
    });

    await patient.save();
    res
      .status(201)
      .json({ message: "Patient registered successfully", patient });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Server error", error });
  }
};
//search

export const searchPatient = async (req, res) => {
  try {
    const { name, id, phone } = req.query;

    // Build query object
    let query = {};
    if (name) {
      query.fullName = new RegExp(name, "i"); // Case-insensitive search
    }
    if (id) {
      query._id = id;
    }
    if (phone) {
      query.phone = phone;
    }

    const patients = await Patient.find(query);
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllPatient = async (req, res) => {
  try {
    const allPatient = await Patient.find({});
    if (!allPatient) {
      return res.status(200).json({ message: "no patient found", allPatient });
    }
    return res
      .status(200)
      .json({ message: "all patients fetched successfuly", allPatient });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const assignCareManager = async (req, res) => {
  try {
    const { staffId, patientId } = req.body;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(400).json({ message: "patient not found" });
    }
    if (patient.careManager) {
      return res
        .status(400)
        .json({ message: "patient already have care manager" });
    }
    const staffMember = await Staff.findById(staffId);
    if (!staffMember) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    patient.careManager = staffId;
    await patient.save();

    return res
      .status(200)
      .json({ message: "care manager assigned to patient" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Error updating staff member", error });
  }
};

export const getPatientById = async(req,res)=>{
  try {
    const {id} = req.params;
    const patient = await Patient.findById(id)
    if(!patient){
      return res
      .status(400)
      .json({ message: "Error in fetching patient" });
    }
    return res
      .status(200)
      .json({ message: "patient fetched successfully",patient });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Error in getPatientById controller", error });
  }
}


export const validationToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY || 'default_secret');
    req.user = decode; // Pass the decoded token to the next middleware/handler
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Invalid token' });
  }
}
// Controller to update patient details
export const updatePatientDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Find the patient by ID and update with new data
    const updatedPatient = await Patient.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure new data meets schema requirements
    });

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      message: "Patient details updated successfully", updatedPatient
    });
  } catch (error) {
    console.error("Error updating patient details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updatePatientCallDetails = async (req, res) => {
  try {
    
    const {id,reportData} = req.body;
    console.log(reportData)

    if (!reportData) {
      return res.status(400).json({ message: "Call details are required" });
    }

    // Find the patient by ID and push new call details into the callDetails array
    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      {
        $push: { callDetails: reportData }, // Push new call details to the array
      },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      message: "Call details updated successfully",
      updatedPatient,
    });
  } catch (error) {
    console.error("Error updating call details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

