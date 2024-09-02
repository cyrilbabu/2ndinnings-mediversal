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

export const getAllPatient = async(req,res)=>{
  try {
    const allPatient= await Patient.find({})
    if(!allPatient){
      return res.status(200).json({ message: "no patient found", allPatient});
    }
    return res.status(200).json({ message: "all patients fetched successfuly", allPatient});
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export const assignCareManager = async (req, res) => {
  try {
    const { staffId,patientId} = req.body;
  
    const patient = await Patient.findById({_id:patientId});
    if (!patient) {
      return res.status(400).json({ message: "patient not found" });
    }
    if(patient.careManager){
      return res.status(400).json({ message: "patient already have care manager" });
    }
    const staffMember = await Staff.findById(staffId);
    if (!staffMember) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    
    patient.careManager = staffId
    await patient.save()

    return res.status(200).json({message:"care manager assigned to patient"});
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Error updating staff member", error });
  }
};