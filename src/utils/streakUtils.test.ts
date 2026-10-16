import { describe, expect, it } from 'vitest';
import { subDays, format } from 'date-fns';

import { calculateStreak } from './streakUtils';

const formatDate = (date: Date): string => format(date, 'yyyy-MM-dd');

describe('calculateStreak', () => {
  it('возвращает 0 для пустого массива', () => {
    expect(calculateStreak([])).toBe(0);
  });

  it('возвращает 1, если отмечен только сегодняшний день', () => {
    const today = formatDate(new Date());
    expect(calculateStreak([today])).toBe(1);
  });

  it('возвращает 3, если отмечены 3 дня подряд', () => {
    const today = new Date();
    const dates = [
      formatDate(today),
      formatDate(subDays(today, 1)),
      formatDate(subDays(today, 2)),
    ];
    expect(calculateStreak(dates)).toBe(3);
  });

  it('возвращает 0, если последняя отметка была 3 дня назад', () => {
    const today = new Date();
    const dates = [
      formatDate(subDays(today, 3)),
      formatDate(subDays(today, 4)),
    ];
    expect(calculateStreak(dates)).toBe(0);
  });
});