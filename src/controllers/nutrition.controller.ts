import { Request, Response } from 'express';
import { calculateCalories } from '../services/calorie.service';
import { calculateMacros } from '../services/macro.service';
import { buildMealPlanPrompt } from '../prompts/mealPlan.prompt';
import { generateMealPlan } from '../services/ai.service';
import { lbToKg } from '../utils/unitConverter';

export const generatePlan = async (req: Request, res: Response) => {
  try {
    const input = req.body;

    const calories = calculateCalories(input);
    const weightKg =
      input.unit === 'lb' ? lbToKg(input.weight) : input.weight;

    const macros = calculateMacros(calories, weightKg);
    const prompt = buildMealPlanPrompt(
      macros.calories,
      macros.protein,
      macros.carbs,
      macros.fat
    );

    const plan = await generateMealPlan(prompt);

    res.json({
      macros,
      mealPlan: JSON.parse(plan!)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate plan' });
  }
};
