import { Router } from "express";

import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../controllers/user.controller.js";
import { verificarAutenticacion } from "../middlewares/auth.js";

const router = Router();

router.get("/user/getUsers", verificarAutenticacion, getUsers);
router.get("/user/getUserById/:id", verificarAutenticacion, getUserById);
router.put("/user/updateUserById/:id", verificarAutenticacion, updateUserById);
router.delete(
  "/user/deleteUserById/:id",
  verificarAutenticacion,
  deleteUserById
);

export default router;
