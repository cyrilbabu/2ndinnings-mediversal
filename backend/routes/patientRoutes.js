import express from "express";
import { getAllPatient, registerPatient, searchPatient } from "../controllers/patient.controller.js";


const router = express.Router();

// Register a new patient
router.post("/register",registerPatient);

// Search patients
router.get("/search",searchPatient);
router.get("/getAllPatient",getAllPatient);

export default router;
