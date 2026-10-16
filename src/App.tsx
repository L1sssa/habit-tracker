import { useState } from 'react';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AddHabitForm } from './components/AddHabitForm';
import { HabitList } from './components/HabitList';
import { useHabits } from './hooks/useHabits';

function App() {
  const { habits, addHabit, deleteHabit, toggleHabitForDate } = useHabits();
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('add-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleFeaturesClick = () => {
    document.getElementById('habits')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddHabit = (name: string, color: string, type: 'useful' | 'harmful') => {
    addHabit(name, color, type);
  };

  return (
    <div className="app">
      <Header onAddClick={handleAddClick} />
      <Hero onAddClick={handleAddClick} onFeaturesClick={handleFeaturesClick} />

      <section className="app__section" id="habits">
        <div className="app__container">
          <h2 className="app__title">Мои привычки</h2>

          <div id="add-form" className="app__form-wrapper">
            {showForm ? (
              <AddHabitForm onAdd={handleAddHabit} />
            ) : (
              <button
                type="button"
                className="app__show-form"
                onClick={() => setShowForm(true)}
              >
                + Добавить привычку
              </button>
            )}
          </div>

          <HabitList
            habits={habits}
            onToggleDate={toggleHabitForDate}
            onDelete={deleteHabit}
          />
        </div>
      </section>
    </div>
  );
}

export default App;