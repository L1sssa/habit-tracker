import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../api/supabase';
import { useAuth } from '../context/AuthContext';
import type { Habit, HabitType } from '../types/habit';

export const useHabits = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Загрузка привычек из БД
  const fetchHabits = useCallback(async () => {
    if (!user) {
      setHabits([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await supabase
      .from('habits')
      .select(`
        *,
        habit_completions (completed_date)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Ошибка загрузки привычек:', error);
      setErrorMsg('Не удалось загрузить привычки. Обновите страницу.');
      setLoading(false);
      return;
    }

    // Преобразуем данные из БД в наш формат Habit (без использования any)
    const formattedHabits: Habit[] = data.map((item: Record<string, unknown>) => ({
      id: item.id as string,
      name: item.name as string,
      color: item.color as string,
      type: item.type as HabitType,
      createdAt: item.created_at as string,
      completedDates: (item.habit_completions as Array<{ completed_date: string }>).map(
        (c) => c.completed_date
      ),
    }));

    setHabits(formattedHabits);
    setLoading(false);
  }, [user]);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchHabits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Добавление привычки
  const addHabit = async (name: string, color: string, type: HabitType) => {
    if (!user) return;
    const trimmed = name.trim();
    if (!trimmed) return;

    setErrorMsg(null);

    const { data, error } = await supabase
      .from('habits')
      .insert([{ name: trimmed, color, type, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Ошибка добавления:', error);
      setErrorMsg('Не удалось добавить привычку.');
      return;
    }

    const newHabit: Habit = {
      id: data.id,
      name: data.name,
      color: data.color,
      type: data.type as HabitType,
      createdAt: data.created_at,
      completedDates: [],
    };
    setHabits((prev) => [newHabit, ...prev]);
  };

  // Удаление привычки
  const deleteHabit = async (id: string) => {
    if (!user) return;
    setErrorMsg(null);

    const { error } = await supabase.from('habits').delete().eq('id', id);

    if (error) {
      console.error('Ошибка удаления:', error);
      setErrorMsg('Не удалось удалить привычку.');
      return;
    }

    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  // Отметка за дату
  const toggleHabitForDate = async (habitId: string, dateISO: string) => {
    if (!user) return;

    const habit = habits.find((h) => h.id === habitId);
    if (!habit) return;

    setErrorMsg(null);
    const isDone = habit.completedDates.includes(dateISO);

    if (isDone) {
      // Удаляем отметку
      const { error } = await supabase
        .from('habit_completions')
        .delete()
        .eq('habit_id', habitId)
        .eq('completed_date', dateISO);

      if (error) {
        console.error('Ошибка удаления отметки:', error);
        setErrorMsg('Не удалось снять отметку.');
        return;
      }

      setHabits((prev) =>
        prev.map((h) =>
          h.id === habitId
            ? { ...h, completedDates: h.completedDates.filter((d) => d !== dateISO) }
            : h
        )
      );
    } else {
      // Добавляем отметку
      const { error } = await supabase
        .from('habit_completions')
        .insert([{ habit_id: habitId, user_id: user.id, completed_date: dateISO }]);

      if (error) {
        console.error('Ошибка добавления отметки:', error);
        setErrorMsg('Не удалось отметить привычку.');
        return;
      }

      setHabits((prev) =>
        prev.map((h) =>
          h.id === habitId ? { ...h, completedDates: [...h.completedDates, dateISO] } : h
        )
      );
    }
  };

  return {
    habits,
    loading,
    errorMsg,
    clearError: () => setErrorMsg(null),
    addHabit,
    deleteHabit,
    toggleHabitForDate,
  };
};