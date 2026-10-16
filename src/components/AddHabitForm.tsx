import { useState } from 'react';

import type { HabitType } from '../types/habit';
import './AddHabitForm.css';

interface AddHabitFormProps {
  onAdd: (name: string, color: string, type: HabitType) => void;
}

const COLORS = [
  '#4CAF50',
  '#1E5FA8',
  '#FF6B35',
  '#9C27B0',
  '#F44336',
  '#FFC107',
];

export const AddHabitForm = ({ onAdd }: AddHabitFormProps) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [type, setType] = useState<HabitType>('useful');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = name.trim();

    if (!trimmed) {
      setError('Введите название привычки');
      return;
    }

    if (trimmed.length > 50) {
      setError('Название не должно превышать 50 символов');
      return;
    }

    onAdd(trimmed, color, type);
    setName('');
    setColor(COLORS[0]);
    setType('useful');
    setError('');
  };

  return (
    <form className="add-habit-form" onSubmit={handleSubmit}>
      <div className="add-habit-form__field">
        <label className="add-habit-form__label" htmlFor="habit-name">
          Название привычки
        </label>
        <input
          id="habit-name"
          className="add-habit-form__input"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            if (error) setError('');
          }}
          placeholder="Например: Пить воду"
          maxLength={50}
        />
        {error && <span className="add-habit-form__error">{error}</span>}
      </div>

      <div className="add-habit-form__field">
        <span className="add-habit-form__label">Цвет</span>
        <div className="add-habit-form__colors">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              className={`add-habit-form__color ${color === c ? 'is-active' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
              aria-label={`Выбрать цвет ${c}`}
            />
          ))}
        </div>
      </div>

      <div className="add-habit-form__field">
        <span className="add-habit-form__label">Тип</span>
        <div className="add-habit-form__types">
          <button
            type="button"
            className={`add-habit-form__type ${type === 'useful' ? 'is-active' : ''}`}
            onClick={() => setType('useful')}
          >
            Полезная
          </button>
          <button
            type="button"
            className={`add-habit-form__type ${type === 'harmful' ? 'is-active' : ''}`}
            onClick={() => setType('harmful')}
          >
            Вредная
          </button>
        </div>
      </div>

      <button type="submit" className="add-habit-form__submit">
        Добавить привычку
      </button>
    </form>
  );
};