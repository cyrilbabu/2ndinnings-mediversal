import Staff from "../models/staff.model.js";
<<<<<<< HEAD
import jwt from "jsonwebtoken";

const createToken = (id, role) => {
  const normalizedRole = role.replace(/\s+/g, "_"); // Replace spaces with underscores
  console.log("Creating token with:", { id, role: normalizedRole });
  return jwt.sign(
    { id, role: normalizedRole },
    process.env.SECRET_KEY || "default_secret",
    {
      expiresIn: "3d",
    }
  );
};

=======
import jwt from 'jsonwebtoken'


const createToken = (id, role) => {
  console.log("Creating token with:", { id, role });
  return jwt.sign({ id, role }, process.env.SECRET_KEY || "default_secret", {
    expiresIn: "3d",
  });
};



// Create new staff
// Import the necessary modules
import bcrypt from 'bcrypt';

>>>>>>> d5bd17fe0833a03ac7e75e430d531573e1bf706c
// Create new staff
export const staffSignup = async (req, res) => {
  try {
    const { name, phone, role, username, password } = req.body;

<<<<<<< HEAD
    // Check if a staff member with the given username already exists
    const existingStaff = await Staff.findOne({ username });
    if (existingStaff) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new staff member if the username does not exist
    const staff = new Staff({ name, phone, role, username, password });
    await staff.save();

    return res
      .status(201)
      .json({ message: "Staff member created successfully" });
=======
    // Check if the staff member already exists
    const existingStaff = await Staff.findOne({ username });
    if (existingStaff) {
      return res.status(400).json({ error: "Staff member already exists" });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new staff member with the hashed password
    const staff = new Staff({ name, phone, role, username, password: hashedPassword });
    await staff.save();

    // Create a JWT token for the newly created staff member
    const token = createToken(staff._id, role);

    // Send the response back with the token and staff data
    res.status(201).json({ success: true, token, staff });
>>>>>>> d5bd17fe0833a03ac7e75e430d531573e1bf706c
  } catch (error) {
    console.error("Error in staff signup:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


// Update staff
export const updateStaff = async (req, res) => {
  try {
    const { name, phone, role, username, password } = req.body;
    const updateData = { name, phone, role, username };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    const staff = await Staff.findOneAndUpdate({ username }, updateData, {
      new: true,
    });
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    return res.status(200).json(staff);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Error updating staff member", error });
  }
};

// Delete staff
export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findByIdAndDelete(id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.status(200).json({ message: "Staff member deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting staff member", error });
  }
};

// Get all staff
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    if (!staff) {
      return res.status(400).json({ error: "error in fetching staff details" });
    }
    return res
      .status(200)
      .json({ message: "staff fetched successfully", staff });
  } catch (error) {
    res.status(500).json({ message: "Error fetching staff members", error });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await Staff.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check if the password matches
    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Create the token with user's ID and role
    const token = createToken(user._id, user.role);

    // Return the success response with the token
    return res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

<<<<<<< HEAD
export const getStaffById = async (req, res) => {
=======

export const getStaffById = async(req,res)=>{
>>>>>>> d5bd17fe0833a03ac7e75e430d531573e1bf706c
  try {
    const { id } = req.params;
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(400).json({ message: "Error in fetching staff" });
    }
    return res
      .status(200)
      .json({ message: "staff fetched successfully", staff });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Error in getStaffById controller", error });
  }
};
