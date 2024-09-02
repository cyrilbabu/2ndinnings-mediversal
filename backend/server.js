import express from "express";
import connectDB from "./db/db.js";
import staffRoutes from "./routes/staffRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import cors from "cors";
import verifyRouter from "./routes/privetRoutes.js";

const app = express();
const port = 3000;
connectDB();
app.use(express.json());
app.use(cors());

app.use("/api/staff", staffRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/private",verifyRouter)

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
