import { Router } from 'express';
import { generatePlan } from '../controllers/nutrition.controller';

const router = Router();

router.post('/plan', generatePlan);

export default router;
