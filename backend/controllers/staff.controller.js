import Staff from "../models/staff.model.js";

// Create new staff
export const staffSignup = async (req, res) => {
  try {
    const { name, phone, role, username, password } = req.body;
    const staff = new Staff({ name, phone, role, username, password });
    await staff.save();
    return res.status(200).json(staff);
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
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: "Error fetching staff members", error });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await Staff.findOne({ username: username, role: role });

    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }

    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    return res.status(200).json({ message: "logged in successfully", user });
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
