// routes/protectedRoutes.js

import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/verifyToken.js'; // Adjust the path as necessary

const verifyRouter = express.Router();

// Example protected route for Admins
verifyRouter.get('/admin-only', verifyToken, authorizeRoles('Admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome Admin!' });
});

// Example protected route for Care Managers
verifyRouter.get('/care-manager-only', verifyToken, authorizeRoles('Care Manager'), (req, res) => {
  res.status(200).json({ message: 'Welcome Care Manager!' });
});

// Example protected route for Home Care Staff
verifyRouter.get('/home-care-staff-only', verifyToken, authorizeRoles('Home Care Staff'), (req, res) => {
  res.status(200).json({ message: 'Welcome Home Care Staff!' });
});

// Example protected route for multiple roles
verifyRouter.get('/multi-role', verifyToken, authorizeRoles('Admin', 'Front Desk', 'Care Manager'), (req, res) => {
  res.status(200).json({ message: 'Welcome to Multi-role Access!' });
});

export default verifyRouter;
