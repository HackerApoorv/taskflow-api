import { Router } from "express";
import { getUser } from "../controllers/profile.controller.js";


const router = Router();

router.get("/profile", getUser);

router.get("/profile/:id", getUser);

export default router;