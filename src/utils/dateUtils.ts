import { addDays, format, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';

/**
 * Возвращает массив из 7 дат текущей недели (Пн–Вс).
 * @param weekOffset - Смещение недели: 0 = текущая, -1 = прошлая, 1 = следующая.
 */
export const getWeekDays = (weekOffset: number = 0): Date[] => {
  const today = new Date();
  const monday = startOfWeek(addDays(today, weekOffset * 7), { weekStartsOn: 1 });

  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
};

/**
 * Преобразует дату в ISO-формат YYYY-MM-DD.
 */
export const toISODate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * Возвращает короткое название дня недели (Пн, Вт, ...).
 */
export const getShortDayName = (date: Date): string => {
  return format(date, 'EEEEEE', { locale: ru });
};

/**
 * Возвращает число месяца (1, 2, 3, ...).
 */
export const getDayNumber = (date: Date): string => {
  return format(date, 'd');
};

/**
 * Возвращает заголовок недели (например, «14 — 20 октября»).
 */
export const getWeekRange = (weekOffset: number = 0): string => {
  const days = getWeekDays(weekOffset);
  const first = days[0];
  const last = days[6];

  const sameMonth = first.getMonth() === last.getMonth();

  if (sameMonth) {
    return `${format(first, 'd')} — ${format(last, 'd MMMM', { locale: ru })}`;
  }

  return `${format(first, 'd MMM', { locale: ru })} — ${format(last, 'd MMM', { locale: ru })}`;
};

/**
 * Проверяет, является ли дата сегодняшней.
 */
export const isToday = (date: Date): boolean => {
  return toISODate(date) === toISODate(new Date());
};