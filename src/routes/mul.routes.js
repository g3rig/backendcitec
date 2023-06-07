import { Router } from "express";
import {
  getBetweenDate,
  getLastData,
  getLastDataHome,
  getLastDataSensor,

} from "../controllers/mul.controller.js";
import { verificarAutenticacion } from "../middlewares/auth.js";

const router = Router();

router.get("/mul", verificarAutenticacion, getLastData);
router.get("/mul/getLastDataHome", verificarAutenticacion, getLastDataHome)
router.get("/mul/getBetweenDate", verificarAutenticacion, getBetweenDate);
router.get("/mul/getLastDataSensor", verificarAutenticacion, getLastDataSensor);

export default router;