export const calculateMacros = (
  calories: number,
  weightKg: number
) => {
  const protein = Math.round(weightKg * 2);
  const fat = Math.round((calories * 0.27) / 9);
  const carbs = Math.round(
    (calories - (protein * 4 + fat * 9)) / 4
  );

  return { calories, protein, carbs, fat };
};
