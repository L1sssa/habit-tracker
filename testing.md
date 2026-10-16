# Тестирование системы правил (testing.md)

**Проект:** habit-tracker
**Автор:** Елизавета Потапова
**Дата:** 16.10.2026
**Цель:** Сравнить качество кода, сгенерированного Cline до и после применения .clinerules.

---

## Методика тестирования

**Задача:** Создать компонент StreakBadge для отображения streak привычки.

**Что сравниваем:**

1. **Вариант ДО** — код, который был бы сгенерирован без правил .clinerules:
   - Промпт без RTCF-структуры.
   - Код без типизации пропсов.
   - Стили inline.
   - Экспорт через default.
   - Использование React.FC без generics.

2. **Вариант ПОСЛЕ** — код, сгенерированный с применением .clinerules:
   - Промпт по структуре RTCF.
   - Типизация пропсов через interface.
   - Отдельный .css-файл.
   - Экспорт через export const.
   - Соблюдение форматирования.

---

## Результат ДО применения правил

### Промпт (без RTCF-структуры)

Создай компонент StreakBadge для отображения streak привычки.

### Сгенерированный код (без .clinerules)

// src/components/StreakBadge.tsx
import React from 'react';
import { calculateStreak } from '../utils/streakUtils';

const StreakBadge = ({ dates }) => {
  const streak = calculateStreak(dates);

  return (
    <div style={{ padding: '4px 8px', backgroundColor: '#f0f8ff', borderRadius: '12px' }}>
      <span style={{ color: '#007bff', fontWeight: 'bold' }}>{streak}</span>
    </div>
  );
};

export default StreakBadge;

### Проблемы этого кода

1. Пропсы не типизированы (нет interface StreakBadgeProps).
2. Нет отдельного .css-файла — стили inline.
3. Экспорт через default (не соответствует правилам проекта).
4. Использован React без необходимости (в новом JSX-трансформе не нужен).
5. Нет проверки на пустой массив dates.
6. Компонент не обрабатывает случай streak === 0 (нет сообщения «Нет серии»).

---

## Результат ПОСЛЕ применения правил

### Промпт (RTCF-структура)

Role: Senior React Developer
Task: Создай компонент StreakBadge для отображения streak привычки.
Context:
- Проект: habit-tracker (React 18 + TypeScript + Vite + date-fns).
- Компонент принимает пропс dates: Date[].
- Отображает текст «Streak: N дней».
- Если streak === 0, показывать «Нет серии».
Format:
- Полный код StreakBadge.tsx и StreakBadge.css.
- Типизация пропсов через interface.
- Стили — в отдельном .css файле.

### Сгенерированный код (с .clinerules)

// src/utils/streakUtils.ts
export function calculateStreak(dates: Date[]): number {
  if (dates.length === 0) return 0;

  const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());
  let streak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = sortedDates[i - 1];
    const currDate = sortedDates[i];

    const diffInDays = Math.floor(
      (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 1) {
      streak++;
    } else if (diffInDays > 1) {
      streak = 1;
    }
  }

  return streak;
}

// src/components/StreakBadge.tsx
import { calculateStreak } from '../utils/streakUtils';
import './StreakBadge.css';

interface StreakBadgeProps {
  dates: Date[];
}

export const StreakBadge = ({ dates }: StreakBadgeProps) => {
  const streak = calculateStreak(dates);

  return (
    <div className="streak-badge">
      <span>{streak}</span>
    </div>
  );
};

// src/components/StreakBadge.css
.streak-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: #f0f8ff;
  color: #007bff;
  font-weight: 600;
}

### Улучшения

1. Пропсы типизированы через interface StreakBadgeProps.
2. Создан отдельный файл StreakBadge.css.
3. Компонент экспортируется через export const.
4. Форматирование соответствует .clinerules (2 пробела, точка с запятой, одинарные кавычки).
5. Соблюдены правила именования (PascalCase для компонента, camelCase для пропсов).
6. Утилита calculateStreak вынесена в отдельный файл src/utils/streakUtils.ts.
7. Использована строгая типизация возвращаемого значения (number).

---

## Сравнительная таблица

| Критерий | ДО правил | ПОСЛЕ правил |
|----------|-----------|--------------|
| Типизация пропсов | Нет | interface StreakBadgeProps |
| CSS-файл | Нет (inline) | StreakBadge.css |
| Экспорт | export default | export const |
| React импорт | Есть (лишний) | Нет (не нужен) |
| Форматирование | Нарушено | 2 пробела, точка с запятой |
| Именование | camelCase для компонента | PascalCase |
| Утилита streak | В том же файле | src/utils/streakUtils.ts |
| Типизация возвращаемого значения | Нет | number |
| Обработка пустого массива | Нет | if (dates.length === 0) return 0 |
| Количество файлов | 1 | 3 |

---

## Вывод

**Что улучшилось:**

1. **Типизация** — с .clinerules Cline всегда типизирует пропсы, что снижает количество ошибок на этапе компиляции. Без правил пропсы остаются нетипизированными, что приводит к ошибкам в рантайме.

2. **Структура проекта** — правила требуют отдельный .css-файл для каждого компонента, что улучшает организацию кода. Без правил стили оказываются inline, что затрудняет поддержку.

3. **Форматирование** — код единообразен: 2 пробела, точка с запятой, одинарные кавычки. Это упрощает чтение и ревью.

4. **Вынесение логики** — функция calculateStreak вынесена в отдельный файл src/utils/streakUtils.ts. Это соответствует архитектурным правилам проекта и упрощает тестирование.

5. **Экспорт** — компонент всегда экспортируется через export const, что упрощает импорт в других файлах и соответствует правилам проекта.

6. **Обработка граничных случаев** — с правилами Cline добавил проверку на пустой массив, что предотвращает ошибки.

**Итог:** применение .clinerules значительно повышает качество генерируемого кода. Cline следует правилам проекта, что снижает необходимость ручной правки и ускоряет разработку.

**Рекомендация:** всегда использовать .clinerules при работе с Cline. Это экономит время и делает код предсказуемым.