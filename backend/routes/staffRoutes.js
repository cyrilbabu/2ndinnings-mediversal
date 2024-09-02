import express from "express";
import { getAllStaff, getStaffById, login, staffSignup, updateStaff } from "../controllers/staff.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", staffSignup);
router.post("/updateStaff", updateStaff);
router.get("/getAllStaff", getAllStaff);
router.get("/getStaffById/:id",getStaffById);

export default router;
