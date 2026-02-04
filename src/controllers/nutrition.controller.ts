import { Request, Response } from "express";
import { generateMealPlan } from "../services/ai.service";
import { calculateCalories } from "../services/calorie.service";
import { calculateMacros } from "../services/macro.service";
import type { UserInput } from "../types/nutrition.types";

/**
 * POST /nutrition/calories
 */
export function calculateCaloriesController(req: Request, res: Response) {
  try {
    const {
      unit,
      weight,
      height,
      age,
      gender,
      activityLevel,
      goal,
    } = req.body;

    if (
      !unit ||
      !weight ||
      !height ||
      !age ||
      !gender ||
      !activityLevel ||
      !goal
    ) {
      return res.status(400).json({
        message: "Datos incompletos",
      });
    }

    const input: UserInput = {
      unit,               // KG | LB
      weight: Number(weight),
      height: Number(height),
      age: Number(age),
      gender,             // MALE | FEMALE
      activityLevel,      // SEDENTARY | LOW | MODERATE | HIGH
      goal,               // LOSE_WEIGHT | GAIN_WEIGHT
    };

    const calories = calculateCalories(input);

    return res.json({ calories });
  } catch (error) {
    console.error("❌ Error calculateCaloriesController:", error);
    return res.status(500).json({
      message: "Error calculando calorías",
    });
  }
}

/**
 * POST /nutrition/macros
 */
export function calculateMacrosController(req: Request, res: Response) {
  try {
    const {
      unit,
      weight,
      height,
      age,
      gender,
      activityLevel,
      goal,
    } = req.body;

    if (
      !unit ||
      !weight ||
      !height ||
      !age ||
      !gender ||
      !activityLevel ||
      !goal
    ) {
      return res.status(400).json({
        message: "Datos incompletos para el cálculo",
      });
    }

    const input: UserInput = {
      unit,
      weight: Number(weight),
      height: Number(height),
      age: Number(age),
      gender,
      activityLevel,
      goal,
    };

    const calories = calculateCalories(input);
    const macros = calculateMacros(calories, input.weight);

    return res.json(macros);
  } catch (error) {
    console.error("❌ Error calculateMacrosController:", error);
    return res.status(500).json({
      message: "Error calculando macros",
    });
  }
}

/**
 * POST /nutrition/meal-plan
 */
export const generateMealPlanController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        success: false,
        error: "Prompt inválido",
      });
    }

    const result = await generateMealPlan(prompt);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("❌ Error en generateMealPlanController:", error);
    return res.status(503).json({
      success: false,
      error: "Servicio de IA no disponible. Reintenta.",
    });
  }
};
