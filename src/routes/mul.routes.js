import { Router } from "express";
import {
  getBetweenDate,
  getLastData,
  getLastDataSensor,
} from "../controllers/mul.controller.js";
import { verificarAutenticacion } from "../middlewares/auth.js";

const router = Router();

router.get("/mul", getLastData);
router.get("/mul/getByDate", verificarAutenticacion, getBetweenDate);
router.get("/mul/getLastDataSensor", getLastDataSensor);

export default router;
