import { Request, Response } from 'express';
import { generateMealPlan } from '../services/ai.service';

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
