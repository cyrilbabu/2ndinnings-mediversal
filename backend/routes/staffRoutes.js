import express from "express";
import {
  getAllStaff,
  getStaffById,
  login,
  staffSignup,
  updateStaff,
} from "../controllers/staff.controller.js";
import {
  getAssignment,
  uploadAssignment,
  updateAssessment,
  getAssignmentById,
} from "../controllers/assignment.controller.js";

import { upload } from "../middleware/multer.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", staffSignup);
router.post("/updateStaff", updateStaff);
router.get("/getAllStaff", getAllStaff);
router.get("/getStaffById/:id", getStaffById);
router.get("/getAssignment", getAssignment);
router.post("/uploadAssignment", uploadAssignment);

router.post("/updateAssessment", upload.single("photos", 10), updateAssessment);

router.get("/getAssignmentById/:id", getAssignmentById);

export default router;
