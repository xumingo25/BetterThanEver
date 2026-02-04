import { UserInput } from '../types/nutrition.types';
import { lbToKg } from '../utils/unitConverter';

export const calculateCalories = (input: UserInput): number => {
  const weightKg =
    input.unit === 'LB' ? lbToKg(input.weight) : input.weight;

  const bmr =
    input.gender === 'MALE'
      ? 10 * weightKg + 6.25 * input.height - 5 * input.age + 5
      : 10 * weightKg + 6.25 * input.height - 5 * input.age - 161;

  const activityFactor = {
    SEDENTARY: 1.2,
    LOW: 1.375,
    MODERATE: 1.55,
    HIGH: 1.725,
  }[input.activityLevel];

  let calories = bmr * activityFactor;

  if (input.goal === 'LOSE_WEIGHT') calories *= 0.8;
  if (input.goal === 'GAIN_WEIGHT') calories *= 1.15;

  return Math.round(calories);
};
