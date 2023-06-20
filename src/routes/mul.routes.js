import { Router } from "express";
import {
  getBetweenDate,
  getLastData,
  getLastDataHome,
  getLastDataSensor,

} from "../controllers/mul.controller.js";
import { verificarAutenticacion } from "../middlewares/auth.js";

const router = Router();

router.get("/mul", getLastData);
router.get("/mul/getLastDataHome", getLastDataHome)
router.get("/mul/getBetweenDate", getBetweenDate);
router.get("/mul/getLastDataSensor", getLastDataSensor);

export default router;