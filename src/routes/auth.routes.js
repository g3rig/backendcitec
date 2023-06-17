import { Router } from "express";
import { logOut, signIn, signUp, changePassword, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import { verificarAutenticacion, verifyToken } from "../middlewares/auth.js";

const router = Router();

router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);
router.post("/auth/logout", logOut);
router.post("/auth/changePassword", changePassword);
router.post("/auth/forgotPassword", forgotPassword);
router.put("/auth/resetPassword", verifyToken, resetPassword);

export default router;
