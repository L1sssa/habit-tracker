export type HabitType = 'useful' | 'harmful';

export interface Habit {
  id: string;
  name: string;
  color: string;
  type: HabitType;
  createdAt: string;
  completedDates: string[];
}