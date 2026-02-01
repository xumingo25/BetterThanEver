import { UserInput } from '../types/nutrition.types';
import { lbToKg } from '../utils/unitConverter';

export const calculateCalories = (input: UserInput): number => {
  const weightKg =
    input.unit === 'lb' ? lbToKg(input.weight) : input.weight;

  const bmr =
    input.gender === 'male'
      ? 10 * weightKg + 6.25 * input.height - 5 * input.age + 5
      : 10 * weightKg + 6.25 * input.height - 5 * input.age - 161;

  const activityFactor = {
    sedentary: 1.2,
    low: 1.375,
    moderate: 1.55,
    high: 1.725
  }[input.activityLevel];

  let calories = bmr * activityFactor;

  if (input.goal === 'cut') calories *= 0.8;
  if (input.goal === 'bulk') calories *= 1.15;

  return Math.round(calories);
};
