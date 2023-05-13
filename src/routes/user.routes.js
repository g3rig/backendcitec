import { Router } from "express";

import { postLogin } from "../controllers/user.controller.js";

const router = Router();

router.post("/user/postLogin", postLogin);

export default router;