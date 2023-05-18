import { Router } from "express";
import { logout, signIn, signUp } from "../controllers/auth.controller.js";

const router = Router();

router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);
router.post("/auth/logout", logout);

export default router;
