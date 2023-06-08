import { Router } from "express";
import { logOut, signIn, signUp, changePassword } from "../controllers/auth.controller.js";
import { verificarAutenticacion } from "../middlewares/auth.js";

const router = Router();

router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);
router.post("/auth/logout", logOut);
router.post("/auth/changePassword", changePassword);

export default router;
