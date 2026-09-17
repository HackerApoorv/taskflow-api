import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "TaskFlow API is running 🚀",
    version: "1.0.0",
  });
});

export default app;