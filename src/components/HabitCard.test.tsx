import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { HabitCard } from './HabitCard';
import type { Habit } from '../types/habit';

const mockHabit: Habit = {
  id: '1',
  name: 'Зарядка',
  color: '#4CAF50',
  type: 'useful',
  createdAt: '2026-10-16T00:00:00.000Z',
  completedDates: [],
};

const weekDays = [
  new Date('2026-10-12'),
  new Date('2026-10-13'),
  new Date('2026-10-14'),
  new Date('2026-10-15'),
  new Date('2026-10-16'),
  new Date('2026-10-17'),
  new Date('2026-10-18'),
];

describe('HabitCard', () => {
  it('рендерит название привычки', () => {
    render(
      <HabitCard
        habit={mockHabit}
        weekDays={weekDays}
        onToggleDate={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText('Зарядка')).toBeInTheDocument();
  });

  it('вызывает onDelete при клике на кнопку «Удалить»', () => {
    const onDelete = vi.fn();

    render(
      <HabitCard
        habit={mockHabit}
        weekDays={weekDays}
        onToggleDate={vi.fn()}
        onDelete={onDelete}
      />
    );

    fireEvent.click(screen.getByText('Удалить'));
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});