import express from "express";
import { login, staffSignup, updateStaff } from "../controllers/staff.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", staffSignup);
router.post("/updateStaff", updateStaff);

export default router;
