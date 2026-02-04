import { Router } from "express";
import {
  calculateMacrosController,
  generateMealPlanController,
} from "../controllers/nutrition.controller";

const router = Router();

// 1️⃣ Calcular macros
router.post("/calculate", calculateMacrosController);

// 2️⃣ Generar plan de comidas
router.post("/meal-plan", generateMealPlanController);

export default router;