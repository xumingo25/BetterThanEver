import { Request, Response } from 'express';
import { generateMealPlan } from '../services/ai.service';
import { calculateMacros } from "../services/macro.service";

export function calculateMacrosController(req: Request, res: Response) {
  try {
    const { calories, weight } = req.body;

    if (!calories || !weight) {
      return res.status(400).json({
        message: "calories y weight son requeridos",
      });
    }

    const macros = calculateMacros(
      Number(calories),
      Number(weight)
    );

    return res.json(macros);
  } catch (error) {
    return res.status(400).json({
      message: "Error calculando macros",
    });
  }
}

export const generateMealPlanController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { prompt } = req.body;

    // 🔒 Validación mínima
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Prompt inválido',
      });
    }

    const result = await generateMealPlan(prompt);

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error('❌ Error en generateMealPlanController:', error);

    return res.status(503).json({
      success: false,
      error: 'Servicio de IA no disponible. Reintenta.',
    });
  }
};
