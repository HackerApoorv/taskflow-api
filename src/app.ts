import express from "express";
import healthRoutes from "./routes/health.route.js";
import profileRoutes from "./routes/profile.route.js";

const app = express();

app.use("/api", healthRoutes);
app.use("/api", profileRoutes);

export default app;