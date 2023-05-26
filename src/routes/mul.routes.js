import { Router } from "express";
import {
  getBetweenDate,
  getLastData,
  getLastDataSensor,
} from "../controllers/mul.controller.js";
import { verificarAutenticacion } from "../middlewares/auth.js";

const router = Router();

router.get("/mul", verificarAutenticacion, getLastData);
router.get("/mul/getByDate", verificarAutenticacion, getBetweenDate);
router.get("/mul/getLastDataSensor", verificarAutenticacion, getLastDataSensor);

export default router;
