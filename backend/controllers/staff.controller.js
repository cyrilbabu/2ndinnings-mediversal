const Staff = require('../models/Staff');
const bcrypt = require('bcrypt');

// Create new staff
exports.createStaff = async (req, res) => {
    try {
        const { name, phone, role, username, password } = req.body;
        const staff = new Staff({ name, phone, role, username, password });
        await staff.save();
        res.status(201).json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Error creating staff member', error });
    }
};

// Update staff
exports.updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, role, username, password } = req.body;
        const updateData = { name, phone, role, username };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        const staff = await Staff.findByIdAndUpdate(id, updateData, { new: true });
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Error updating staff member', error });
    }
};

// Delete staff
exports.deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const staff = await Staff.findByIdAndDelete(id);
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.status(200).json({ message: 'Staff member deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting staff member', error });
    }
};

// Get all staff
exports.getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.find();
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching staff members', error });
    }
};
