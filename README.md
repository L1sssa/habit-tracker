# Habit Tracker

Веб-приложение для отслеживания привычек с ежедневными отметками и визуализацией прогресса.

## О проекте

**Habit Tracker** помогает формировать полезные привычки через:
- Добавление привычек с названием и цветом.
- Ежедневные отметки выполнения.
- Расчёт streak (серии дней подряд).
- Визуализацию прогресса.

**Учебный проект** в рамках курса по AI-ассистированной разработке (ДЗ №2).

## Стек

- **React 18** — UI-фреймворк
- **TypeScript 5** — типизация
- **Vite 8** — сборщик
- **date-fns** — работа с датами
- **CSS** — стилизация
- **localStorage** — хранение данных (MVP)
- **Vitest + React Testing Library** — тестирование

## Установка и запуск

```bash
# Клонировать репозиторий
git clone <URL_РЕПОЗИТОРИЯ>
cd habit-tracker

# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev

Приложение будет доступно по адресу: http://localhost:5173

№№ Структура проекта
habit-tracker/
├── src/
│   ├── components/       # Компоненты
│   │   ├── StreakBadge.tsx
│   │   ├── StreakBadge.css
│   │   └── ...
│   ├── hooks/            # Кастомные хуки
│   ├── utils/            # Утилиты
│   │   └── streakUtils.ts
│   ├── types/            # TypeScript-типы
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .clinerules           # Правила для Cline
├── hw_ai_rules.md        # Описание проекта и стека
├── prompt_templates.md   # Библиотека промпт-шаблонов
├── prompt_methodology.md # Chain-of-Thought
├── testing.md            # Тестирование правил
└── README.md

**Полный отчёт по ДЗ №2:** [REPORT_HW2.md](./REPORT_HW2.md)