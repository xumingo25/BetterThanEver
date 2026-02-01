export const buildMealPlanPrompt = (
  calories: number,
  protein: number,
  carbs: number,
  fat: number
) => `
You are a nutrition assistant.

Create a daily meal plan using common Chilean supermarket foods.

Requirements:
- Total calories: ${calories} kcal
- Protein: ~${protein} g
- Carbs: ~${carbs} g
- Fat: ~${fat} g
- 4 meals: breakfast, lunch, snack, dinner
- Low sugar and saturated fat
- Include ingredients and preparation steps

Return ONLY valid JSON with this structure:
{
  "meals": [
    {
      "name": string,
      "calories": number,
      "ingredients": string[],
      "preparation": string
    }
  ],
  "dailyTotals": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fat": number
  }
}
`;
