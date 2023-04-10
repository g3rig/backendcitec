import { Router } from 'express';

import { getAvgBetweenDate, getBetweenDate, getLastData, getMaxBetweenDate, getMinBetweenDate } from '../controllers/mul.controller.js';

const router = Router();

router.get('/mul', getLastData);
router.get('/mul/getByDate', getBetweenDate);
router.get('/mul/getMaxByDate', getMaxBetweenDate);
router.get('/mul/getMinByDate', getMinBetweenDate);
router.get('/mul/getAvgByDate', getAvgBetweenDate);

export default router;