import { useState } from 'react';

import { HabitCard } from './HabitCard';
import { getWeekDays, getWeekRange } from '../utils/dateUtils';
import type { Habit } from '../types/habit';
import './HabitList.css';

interface HabitListProps {
  habits: Habit[];
  onToggleDate: (id: string, dateISO: string) => void;
  onDelete: (id: string) => void;
}

export const HabitList = ({ habits, onToggleDate, onDelete }: HabitListProps) => {
  const [weekOffset, setWeekOffset] = useState(0);

  const weekDays = getWeekDays(weekOffset);
  const weekRange = getWeekRange(weekOffset);

  const usefulHabits = habits.filter((habit) => habit.type === 'useful');
  const harmfulHabits = habits.filter((habit) => habit.type === 'harmful');

  if (habits.length === 0) {
    return (
      <div className="habit-list__empty">
        <div className="habit-list__empty-icon">📝</div>
        <h3 className="habit-list__empty-title">Нет привычек</h3>
        <p className="habit-list__empty-text">
          Добавьте первую привычку, чтобы начать отслеживать прогресс.
        </p>
      </div>
    );
  }

  return (
    <div className="habit-list">
      <div className="habit-list__week-nav">
        <button
          type="button"
          className="habit-list__week-btn"
          onClick={() => setWeekOffset((prev) => prev - 1)}
        >
          ← Предыдущая
        </button>

        <div className="habit-list__week-info">
          <span className="habit-list__week-range">{weekRange}</span>
          {weekOffset !== 0 && (
            <button
              type="button"
              className="habit-list__week-today"
              onClick={() => setWeekOffset(0)}
            >
              К текущей
            </button>
          )}
        </div>

        <button
          type="button"
          className="habit-list__week-btn"
          onClick={() => setWeekOffset((prev) => prev + 1)}
        >
          Следующая →
        </button>
      </div>

      <div className="habit-columns">
        <div className="habit-column">
          <div className="habit-column__header">
            <span className="habit-column__dot habit-column__dot--useful" />
            <h3 className="habit-column__title">Полезные</h3>
            <span className="habit-column__count">{usefulHabits.length}</span>
          </div>

          {usefulHabits.length === 0 ? (
            <p className="habit-column__empty">Нет полезных привычек</p>
          ) : (
            <div className="habit-column__list">
              {usefulHabits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  weekDays={weekDays}
                  onToggleDate={onToggleDate}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>

        <div className="habit-column">
          <div className="habit-column__header">
            <span className="habit-column__dot habit-column__dot--harmful" />
            <h3 className="habit-column__title">Вредные</h3>
            <span className="habit-column__count">{harmfulHabits.length}</span>
          </div>

          {harmfulHabits.length === 0 ? (
            <p className="habit-column__empty">Нет вредных привычек</p>
          ) : (
            <div className="habit-column__list">
              {harmfulHabits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  weekDays={weekDays}
                  onToggleDate={onToggleDate}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};