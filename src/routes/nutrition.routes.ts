import { Router } from 'express';
import { generateMealPlanController } from '../controllers/nutrition.controller';

const router = Router();

router.post('/meal-plan', generateMealPlanController);

export default router;
