# Методология промптов: Chain-of-Thought (prompt_methodology.md)

**Проект:** habit-tracker
**Автор:** Елизавета Потапова
**Дата:** 16.10.2026
**Техника:** Chain-of-Thought (цепочка рассуждений)

---

## Что такое Chain-of-Thought

**Chain-of-Thought (CoT)** — это техника промптинга, при которой сложная задача разбивается на последовательность логических шагов. Каждый шаг решается отдельным промптом, а результат предыдущего шага становится контекстом для следующего.

**Зачем это нужно:**

- AI-агент не «захлёбывается» сложной задачей.
- Каждый шаг проверяем и понятен.
- Легче откатить изменения, если что-то пошло не так.
- Результат качественнее, чем при одном большом запросе.

---

## Выбранная задача

**Задача:** Реализовать функцию добавления и отметки привычек в приложении habit-tracker.

**Требования:**

- Форма добавления новой привычки (название, цвет).
- Список привычек с возможностью отметить выполнение за сегодня.
- Расчёт streak (серии дней) для каждой привычки.
- Сохранение данных в localStorage.
- Сообщение «Нет привычек», если список пуст.

**Почему это сложная задача:**

- Требует нового типа данных (Habit).
- Требует кастомного хука (useHabits).
- Требует утилиты для работы с датами (dateUtils, streakUtils).
- Требует нескольких компонентов (AddHabitForm, HabitList, HabitCard).
- Требует интеграции в App.tsx.
- Есть граничные случаи (пустой список, дубликаты, некорректные даты).

---

## Разбивка на шаги

| Шаг | Задача | Результат |
|-----|--------|-----------|
| 1 | Создать тип Habit | src/types/habit.ts |
| 2 | Создать утилиты для работы с датами | src/utils/dateUtils.ts, src/utils/streakUtils.ts |
| 3 | Создать хук useHabits с localStorage | src/hooks/useHabits.ts |
| 4 | Создать компоненты AddHabitForm и HabitCard | src/components/AddHabitForm.tsx, HabitCard.tsx |
| 5 | Создать HabitList и интегрировать в App | src/components/HabitList.tsx, App.tsx |

**Логика цепочки:** каждый следующий шаг использует результат предыдущего. Нельзя создать useHabits без типа Habit и утилит. Нельзя создать HabitCard без calculateStreak.

---

## Шаг 1. Создание типа Habit

### Промпт

Role: Senior TypeScript Developer
Task: Создай тип Habit в файле src/types/habit.ts.
Context:
- Проект: habit-tracker.
- Привычка должна содержать: id (string), name (string), color (string), createdAt (string, ISO), completedDates (string[], ISO-даты).
- Использовать interface.
Format:
- Полный код файла.
- Экспорт через export interface.

### Результат

Создан файл src/types/habit.ts:

export interface Habit {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  completedDates: string[];
}

---

## Шаг 2. Создание утилит для работы с датами

### Промпт

Role: Senior TypeScript Developer
Task: Создай утилиты dateUtils.ts и streakUtils.ts.
Context:
- Проект: habit-tracker.
- dateUtils: функция getTodayISO() возвращает текущую дату в формате YYYY-MM-DD.
- streakUtils: функция calculateStreak(completedDates: string[]) возвращает количество дней подряд.
- Использовать date-fns (isSameDay, differenceInCalendarDays, subDays).
- Правила streak: сегодня отмечено → streak++; вчера отмечено, сегодня нет → streak продолжается; пропуск 2+ дней → сброс.
Format:
- Полные коды обоих файлов.
- Типизация возвращаемых значений.

### Результат

Созданы файлы src/utils/dateUtils.ts и src/utils/streakUtils.ts.

Функция calculateStreak:
- Принимает массив ISO-дат.
- Сортирует по убыванию.
- Идёт с сегодня назад, считает streak.
- Возвращает число.

---

## Шаг 3. Создание хука useHabits

### Промпт

Role: Senior React Developer
Task: Создай хук useHabits для управления привычками.
Context:
- Проект: habit-tracker.
- Хук хранит массив Habit в localStorage (ключ habit-tracker:habits).
- Функции: addHabit(name, color), deleteHabit(id), toggleHabit(id) — отметить за сегодня.
- Использовать useState, useEffect, useCallback.
- Типизация всех возвращаемых значений.
Format:
- Полный код src/hooks/useHabits.ts.
- Тип возвращаемого значения через interface UseHabitsReturn.

### Результат

Создан файл src/hooks/useHabits.ts.

Хук возвращает:
- habits: Habit[]
- addHabit: (name: string, color: string) => void
- deleteHabit: (id: string) => void
- toggleHabit: (id: string) => void

---

## Шаг 4. Создание компонентов AddHabitForm и HabitCard

### Промпт

Role: Senior React Developer
Task: Создай компоненты AddHabitForm и HabitCard.
Context:
- Проект: habit-tracker.
- AddHabitForm: поле ввода названия, выбор цвета, кнопка «Добавить». Пропс onSubmit(name, color).
- HabitCard: отображает название, streak, кнопки «Отметить» и «Удалить». Пропсы: habit, onToggle, onDelete.
- Использовать calculateStreak для streak.
- Стили — в отдельных .css-файлах рядом.
Format:
- Полные коды 4 файлов: AddHabitForm.tsx, AddHabitForm.css, HabitCard.tsx, HabitCard.css.
- Типизация пропсов через interface.

### Результат

Созданы:
- src/components/AddHabitForm.tsx
- src/components/AddHabitForm.css
- src/components/HabitCard.tsx
- src/components/HabitCard.css

Все компоненты типизированы, используют date-fns и streakUtils.

---

## Шаг 5. Создание HabitList и интеграция в App

### Промпт

Role: Senior React Developer
Task: Создай HabitList и интегрируй всё в App.tsx.
Context:
- Проект: habit-tracker.
- HabitList: принимает habits, onToggle, onDelete, рендерит список HabitCard. Если habits пуст — «Нет привычек».
- App.tsx: использует useHabits, AddHabitForm, HabitList.
- Стили — в отдельных .css-файлах.
Format:
- Полные коды HabitList.tsx, HabitList.css, App.tsx.
- Типизация пропсов.

### Результат

Созданы:
- src/components/HabitList.tsx
- src/components/HabitList.css
- Обновлён src/App.tsx

Приложение собирается без ошибок, данные сохраняются в localStorage, streak считается корректно.

---

## Итог

**Что демонстрирует этот CoT:**

1. **Декомпозиция:** сложная задача разбита на 5 логических шагов.
2. **Последовательность:** каждый шаг опирается на результат предыдущего.
3. **Промпты по RTCF:** каждый шаг имеет Role, Task, Context, Format.
4. **Проверяемость:** после каждого шага видно, что получилось.
5. **Результат:** работающее приложение-трекер привычек.

**Сравнение с одним большим промптом:**

Если бы всё делалось одним промптом, Cline мог бы:
- Забыть про типизацию.
- Не использовать date-fns.
- Создать файлы в неправильных папках.
- Пропустить расчёт streak.

Chain-of-Thought избегает этих проблем за счёт пошагового выполнения.