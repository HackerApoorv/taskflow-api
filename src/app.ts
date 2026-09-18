import express from "express";
import healthRoutes from "./routes/health.route.js";
import profileRoutes from "./routes/profile.route.js";
import usersRoutes from "./routes/users.route.js";

const app = express();

app.use(express.json());

app.use("/api", healthRoutes);
app.use("/api", profileRoutes);
app.use("/api", usersRoutes);
app.get("/", (_req, res) => {
  res.send("Welcome to TaskFlow API");
});

export default app;