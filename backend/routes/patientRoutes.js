import express from "express";

import {
  assignCareManager,
  editPatientRegistration,
  getAllPatient,
  getPatientById,
  registerPatient,
  searchPatient,
  updatePatientCallDetails,
  updatePatientDetails,
} from "../controllers/patient.controller.js";

import { getPlanDetails } from "../controllers/plan.controller.js";

const router = express.Router();

// Register a new patient
router.post("/register", registerPatient);

// Search patients

router.get("/search", searchPatient);
router.get("/getAllPatient", getAllPatient);
router.get("/getPlanDetails", getPlanDetails);
router.post("/assignCareManager", assignCareManager);
router.get("/getPatientById/:id", getPatientById);
router.put("/updateCallDetails", updatePatientCallDetails);
router.post("/register", registerPatient);
router.put("/updatePatient", updatePatientDetails);
router.put("/editpatients", editPatientRegistration);

export default router;
