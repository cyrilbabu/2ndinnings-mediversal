import Staff from "../models/staff.model.js";
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

// Create new staff
export const staffSignup = async (req, res) => {
  try {
    const { name, phone, role, username, password } = req.body;

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
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating staff member", error });
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
    const { username, password, role } = req.body;

    // Find the user by username and role
    const user = await Staff.findOne({ username, role });

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

    return res.status(200).json({ message: "logged in successfully", user });
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getStaffById = async (req, res) => {
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
