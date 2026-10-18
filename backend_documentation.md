# Документация Backend (Supabase)

## Архитектура
- **BaaS:** Supabase (PostgreSQL).
- **Аутентификация:** Supabase Auth (Email + Пароль).
- **Безопасность:** Row Level Security (RLS) включён для всех таблиц.

## Схема базы данных
1. **profiles** — профили пользователей (id, email, created_at).
2. **habits** — привычки (id, user_id, name, color, type, created_at).
3. **habit_completions** — отметки выполнения (id, habit_id, user_id, completed_date).

## RLS Политики
- Пользователи могут видеть и изменять **только свои** привычки и отметки.
- Доступ к чужим данным заблокирован на уровне базы данных.

## API (через Supabase JS Client)
- `supabase.auth.signUp()` / `signInWithPassword()` — регистрация и вход.
- `supabase.from('habits').select()` — загрузка привычек.
- `supabase.from('habits').insert()` — добавление привычки.
- `supabase.from('habit_completions').insert()` — отметка выполнения.

## Переменные окружения
В файле `.env`:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`