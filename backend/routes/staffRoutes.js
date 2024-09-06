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
  updateAssesment,
  uploadPhotos
} from "../controllers/assignment.controller.js";
import { uploadImage} from "../middleware/uploadField.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", staffSignup);
router.post("/updateStaff", updateStaff);
router.get("/getAllStaff", getAllStaff);
router.get("/getStaffById/:id", getStaffById);
router.get("/getAssignment", getAssignment);
router.post("/uploadAssignment", uploadAssignment);
router.post("/uploadPhotos", uploadImage.array("photos"),uploadPhotos)
router.post("/updateAssessment", updateAssesment);
export default router;
