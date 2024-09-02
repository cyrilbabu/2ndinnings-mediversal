import express from "express";
import { assignCareManager, getAllPatient, getPatientById, registerPatient, searchPatient } from "../controllers/patient.controller.js";
import { getPlanDetails } from "../controllers/plan.controller.js";


const router = express.Router();

// Register a new patient
router.post("/register",registerPatient);

// Search patients
router.get("/search",searchPatient);
router.get("/getAllPatient",getAllPatient);
router.get("/getPlanDetails",getPlanDetails);
router.post("/assignCareManager",assignCareManager);
router.get("/getPatientById/:id",getPatientById);

export default router;
