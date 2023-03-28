import { Router } from 'express';

import { getAvgBetweenDateM2, getBetweenDateM2, getLastDataM2, getMaxBetweenDateM2, getMinBetweenDateM2 } from '../controllers/mul_2.controller.js';

const router = Router();

router.get('/mul_2', getLastDataM2);
router.get('/mul_2/getByDate', getBetweenDateM2);
router.get('/mul_2/getMaxByDate', getMaxBetweenDateM2);
router.get('/mul_2/getMinByDate', getMinBetweenDateM2);
router.get('/mul_2/getAvgByDate', getAvgBetweenDateM2);

export default router;