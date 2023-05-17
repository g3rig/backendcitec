import { Router } from "express";

import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/user/getUsers", getUsers);
router.get("/user/getUserById/:id", getUserById);
router.put("/user/updateUserById/:id", updateUserById);
router.delete("/user/deleteUserById/:id", deleteUserById);

export default router;
