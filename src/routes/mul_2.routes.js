import { Router } from 'express';

import { getLastDataM2 } from '../controllers/mul_2.controller.js';

const router = Router();

router.get('/mul_2', getLastDataM2);

export default router;