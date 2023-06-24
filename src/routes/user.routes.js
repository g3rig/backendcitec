import { Router } from "express";

import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../controllers/user.controller.js";
import { verificarAutenticacion, verificarExpiracion } from "../middlewares/auth.js";

const router = Router();

router.get(
  "/user/getUsers",
  verificarExpiracion,
  verificarAutenticacion,
  getUsers);
router.get(
  "/user/getUserById/:id",
  verificarExpiracion,
  verificarAutenticacion,
  getUserById);
router.put("/user/updateUserById/:id",
verificarExpiracion,
verificarAutenticacion,
updateUserById);
router.delete(
  "/user/deleteUserById/:id",
  verificarExpiracion,
  verificarAutenticacion,
  deleteUserById
);

export default router;
