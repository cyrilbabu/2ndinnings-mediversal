import express from "express";
import connectDB from "./db/db.js";
import staffRoutes from "./routes/staffRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import cors from "cors";
import verifyRouter from "./routes/privetRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use(cors());

app.use("/api/staff", staffRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/private", verifyRouter);

app.listen(5000 || process.env.PORT, () => {
  console.log(`Server started on http://localhost:${5000 || process.env.PORT}`);
});
