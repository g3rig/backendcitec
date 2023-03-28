import { Router } from 'express';

import { getAvgBetweenDateM1, getBetweenDateM1, getLastDataM1, getMaxBetweenDateM1, getMinBetweenDateM1 } from '../controllers/mul_1.controller.js';

const router = Router();

router.get('/mul_1', getLastDataM1);
router.get('/mul_1/getByDate', getBetweenDateM1);
router.get('/mul_1/getMaxByDate', getMaxBetweenDateM1);
router.get('/mul_1/getMinByDate', getMinBetweenDateM1);
router.get('/mul_1/getAvgByDate', getAvgBetweenDateM1);

export default router;