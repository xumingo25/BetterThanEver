export type ActivityLevel =
  | 'sedentary'
  | 'low'
  | 'moderate'
  | 'high';

export type Goal = 'cut' | 'bulk';

export interface UserInput {
  unit: 'kg' | 'lb';
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: ActivityLevel;
  goal: Goal;
}

export interface MacroResult {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
