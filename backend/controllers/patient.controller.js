import Patient from "../models/patient.model.js"; // Adjust the path as needed

// Register a new patient
export const registerPatient = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      plan,
      dob,
      emergencyContact,
      healthCondition,
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
      dob,
      emergencyContact,
      healthCondition,
    });

    await patient.save();
    res
      .status(201)
      .json({ message: "Patient registered successfully", patient });
  } catch (error) {
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