import { Router } from "express";
import { getUser } from "../controllers/profile.controller.js";


const router = Router();

router.get("/profile", getUser);

export default router;