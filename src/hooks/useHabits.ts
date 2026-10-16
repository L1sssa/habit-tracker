import { useCallback, useEffect, useState } from 'react';

import type { Habit, HabitType } from '../types/habit';

const STORAGE_KEY = 'habit-tracker:habits';

const getTodayISO = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const loadHabits = (): Habit[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (error) {
    console.error('Ошибка загрузки привычек:', error);
    return [];
  }
};

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>(loadHabits);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    } catch (error) {
      console.error('Ошибка сохранения привычек:', error);
    }
  }, [habits]);

  const addHabit = useCallback((name: string, color: string, type: HabitType) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: trimmed,
      color,
      type,
      createdAt: new Date().toISOString(),
      completedDates: [],
    };

    setHabits((prev) => [newHabit, ...prev]);
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  }, []);

  const toggleHabitForDate = useCallback((id: string, dateISO: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        const alreadyDone = habit.completedDates.includes(dateISO);

        return {
          ...habit,
          completedDates: alreadyDone
            ? habit.completedDates.filter((date) => date !== dateISO)
            : [...habit.completedDates, dateISO],
        };
      })
    );
  }, []);

  const toggleHabit = useCallback((id: string) => {
    toggleHabitForDate(id, getTodayISO());
  }, [toggleHabitForDate]);

  return {
    habits,
    addHabit,
    deleteHabit,
    toggleHabit,
    toggleHabitForDate,
  };
};