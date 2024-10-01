import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/db.js";
import patientRoutes from "./routes/patientRoutes.js";
import verifyRouter from "./routes/privetRoutes.js";

import staffRoutes from "./routes/staffRoutes.js";

dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use(cors());

app.use("/api/staff", staffRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/private", verifyRouter);

app.listen(6200 || process.env.PORT, () => {
  console.log(`Server started on http://localhost:${6200 || process.env.PORT}`);
});
