import { calculateStreak } from '../utils/streakUtils';
import {
  getDayNumber,
  getShortDayName,
  isToday,
  toISODate,
} from '../utils/dateUtils';
import type { Habit } from '../types/habit';
import './HabitCard.css';

interface HabitCardProps {
  habit: Habit;
  weekDays: Date[];
  onToggleDate: (id: string, dateISO: string) => void;
  onDelete: (id: string) => void;
}

export const HabitCard = ({ habit, weekDays, onToggleDate, onDelete }: HabitCardProps) => {
  const streak = calculateStreak(habit.completedDates);

  return (
    <div className="habit-card" style={{ borderLeftColor: habit.color }}>
      <div className="habit-card__header">
        <div className="habit-card__name-row">
          <span className={`habit-card__type habit-card__type--${habit.type}`} />
          <h3 className="habit-card__name">{habit.name}</h3>
        </div>

        <div className="habit-card__streak">
          <span className="habit-card__streak-icon">🔥</span>
          <span className="habit-card__streak-value">{streak}</span>
          <span className="habit-card__streak-label">
            {streak === 1 ? 'день' : streak >= 2 && streak <= 4 ? 'дня' : 'дней'}
          </span>
        </div>
      </div>

      <div className="habit-card__week">
        {weekDays.map((day) => {
          const dateISO = toISODate(day);
          const isDone = habit.completedDates.includes(dateISO);
          const today = isToday(day);

          return (
            <button
              key={dateISO}
              type="button"
              className={`habit-card__day ${isDone ? 'is-done' : ''} ${today ? 'is-today' : ''}`}
              onClick={() => onToggleDate(habit.id, dateISO)}
              title={dateISO}
            >
              <span className="habit-card__day-name">{getShortDayName(day)}</span>
              <span className="habit-card__day-number">{getDayNumber(day)}</span>
              <span className="habit-card__day-check">{isDone ? '✓' : ''}</span>
            </button>
          );
        })}
      </div>

      <div className="habit-card__footer">
        <button
          type="button"
          className="habit-card__btn habit-card__btn--delete"
          onClick={() => onDelete(habit.id)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};