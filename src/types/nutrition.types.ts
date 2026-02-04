export type Unit = 'KG' | 'LB';
export type Gender = 'MALE' | 'FEMALE';
export type ActivityLevel = 'SEDENTARY' | 'LOW' | 'MODERATE' | 'HIGH';
export type Goal = 'LOSE_WEIGHT' | 'GAIN_WEIGHT';

export interface UserInput {
  unit: Unit;
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  goal: Goal;
}
