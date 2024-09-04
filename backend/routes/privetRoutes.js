import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js'; // Ensure the correct path
import { validationToken } from '../controllers/patient.controller.js'; // Ensure the correct path

const verifyRouter = express.Router();

verifyRouter.get('/admin-only', verifyToken, (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ success: false, message: 'Forbidden: Insufficient role' });
  }
  res.status(200).json({ success: true, role: req.user.role });
});

verifyRouter.get('/care-manager-only', verifyToken, (req, res) => {
  if (req.user.role !== 'Care Manager') {
    return res.status(403).json({ success: false, message: 'Forbidden: Insufficient role' });
  }
  res.status(200).json({ success: true, role: req.user.role });
});

verifyRouter.get('/home-care-staff-only', verifyToken, (req, res) => {
  if (req.user.role !== 'Home Care Staff') {
    return res.status(403).json({ success: false, message: 'Forbidden: Insufficient role' });
  }
  res.status(200).json({ success: true, role: req.user.role });
});

verifyRouter.get('/multi-role', verifyToken, (req, res) => {
  if (req.user.role !== 'Front Desk') {
    return res.status(403).json({ success: false, message: 'Forbidden: Insufficient role' });
  }
  res.status(200).json({ success: true, role: req.user.role });
});
verifyRouter.get('/assesor', verifyToken, (req, res) => {
  if (req.user.role !== 'Assessor') {
    return res.status(403).json({ success: false, message: 'Forbidden: Insufficient role' });
  }
  res.status(200).json({ success: true, role: req.user.role });
});

export default verifyRouter;
