import { Router } from "express";
import { logOut, signIn, signUp } from "../controllers/auth.controller.js";
import { verificarAutenticacion } from "../middlewares/auth.js";

const router = Router();

router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);
router.post("/auth/logout", logOut);

export default router;
