import express from "express";
import { login, staffSignup } from "../controllers/staff.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", staffSignup);

export default router;
