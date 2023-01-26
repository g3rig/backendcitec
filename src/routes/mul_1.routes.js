import { Router } from 'express';

import { getLastDataM1 } from '../controllers/mul_1.controller.js';

const router = Router();

router.get('/mul_1', getLastDataM1);

export default router;