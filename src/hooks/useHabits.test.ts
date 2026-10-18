import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useHabits } from './useHabits';

// Мокаем контекст авторизации, чтобы хук не ругался
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user' }, // Просто фейковый пользователь
  }),
}));

// Мокаем Supabase, чтобы тесты не делали реальных запросов
vi.mock('../api/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({ data: [], error: null })),
      })),
    })),
  },
}));

describe('useHabits', () => {
  it('возвращает начальное состояние', () => {
    const { result } = renderHook(() => useHabits());
    
    // Проверяем, что хук вернул функции и массивы
    expect(result.current.habits).toEqual([]);
    expect(result.current.loading).toBe(true); 
    expect(typeof result.current.addHabit).toBe('function');
    expect(typeof result.current.deleteHabit).toBe('function');
    expect(typeof result.current.toggleHabitForDate).toBe('function');
  });
});