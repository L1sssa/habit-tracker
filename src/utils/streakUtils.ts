import { differenceInCalendarDays, parseISO, subDays } from 'date-fns';

/**
 * Вычисляет текущую серию (streak) выполнения привычки.
 *
 * Streak считается с сегодняшнего дня назад, пока даты идут подряд.
 * Если сегодня не отмечено, но вчера отмечено — серия продолжается.
 * Если пропущено 2+ дня — серия сбрасывается в 0.
 *
 * @param dates - Массив дат в формате ISO (YYYY-MM-DD).
 * @returns Количество дней подряд, когда привычка выполнялась.
 *
 * @example
 * calculateStreak(['2026-10-14', '2026-10-15', '2026-10-16']);
 * // вернёт 3
 */
export const calculateStreak = (dates: string[]): number => {
  if (dates.length === 0) return 0;

  const today = new Date();
  const sortedDates = dates
    .map((date) => parseISO(date))
    .sort((a, b) => b.getTime() - a.getTime());

  let streak = 0;
  let checkDate = today;

  for (const date of sortedDates) {
    const diff = differenceInCalendarDays(checkDate, date);

    if (diff === 0 || diff === 1) {
      streak += 1;
      checkDate = subDays(checkDate, 1);
    } else {
      break;
    }
  }

  return streak;
};