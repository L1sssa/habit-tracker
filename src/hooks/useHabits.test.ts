import { describe, expect, it, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { useHabits } from './useHabits';

describe('useHabits', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('добавляет новую привычку', () => {
    const { result } = renderHook(() => useHabits());

    act(() => {
      result.current.addHabit('Зарядка', '#4CAF50', 'useful');
    });

    expect(result.current.habits).toHaveLength(1);
    expect(result.current.habits[0].name).toBe('Зарядка');
    expect(result.current.habits[0].type).toBe('useful');
  });

  it('удаляет привычку по id', () => {
    const { result } = renderHook(() => useHabits());

    act(() => {
      result.current.addHabit('Курение', '#F44336', 'harmful');
    });

    const id = result.current.habits[0].id;

    act(() => {
      result.current.deleteHabit(id);
    });

    expect(result.current.habits).toHaveLength(0);
  });

  it('отмечает привычку за дату', () => {
    const { result } = renderHook(() => useHabits());

    act(() => {
      result.current.addHabit('Прогулка', '#1E5FA8', 'useful');
    });

    const id = result.current.habits[0].id;
    const date = '2026-10-16';

    act(() => {
      result.current.toggleHabitForDate(id, date);
    });

    expect(result.current.habits[0].completedDates).toContain(date);
  });
});