import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import workoutRoutes from "./routes/workoutRoutes";
import juiceReportRoutes from "./routes/juiceReportRoutes";
import progressRoutes from "./routes/progressRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import authRoutes from "./routes/authRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import adminRoutes from "./routes/adminRoutes";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/uploads", uploadRoutes);

app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);
app.use("/juicereports", juiceReportRoutes);
app.use("/progress", progressRoutes);
app.use("/api/categories", categoryRoutes);

// Add this home route
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "DocuSafe API is running"
    });
});

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});