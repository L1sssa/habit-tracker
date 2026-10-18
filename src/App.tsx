import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AddHabitForm } from './components/AddHabitForm';
import { HabitList } from './components/HabitList';
import { useHabits } from './hooks/useHabits';
import { useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';

function App() {
  const { user, loading: authLoading } = useAuth();
  // Теперь достаем loading из useHabits
  const { habits, loading: habitsLoading, addHabit, deleteHabit, toggleHabitForDate, errorMsg, clearError } = useHabits();
  const [showForm, setShowForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  if (authLoading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Загрузка...</div>;
  }

  const handleAddClick = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('add-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleAddHabit = (name: string, color: string, type: 'useful' | 'harmful') => {
    addHabit(name, color, type);
  };

  return (
    <div className="app">
      <Header  onLoginClick={() => setShowLogin(true)} />
      
      {showLogin && <LoginPage onClose={() => setShowLogin(false)} />}

      <section id="hero">
        <Hero onAddClick={handleAddClick} onFeaturesClick={() => {
          document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
        }} />
      </section>

      <section className="app__section" id="features">
        <div className="app__container">
          <h2 className="app__title">Мои привычки</h2>

          {errorMsg && (
          <div style={{ padding: '12px', background: '#fdecec', color: '#c62828', borderRadius: '8px', textAlign: 'center', marginBottom: '16px' }}>
           {errorMsg}
            <button onClick={clearError} style={{ marginLeft: '12px', background: 'transparent', border: 'none', color: '#c62828', textDecoration: 'underline', cursor: 'pointer' }}>
              Скрыть
             </button>
            </div>
            )}

          {!user ? (
            <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '16px', border: '1px solid #eaeaea' }}>
              <p style={{ fontSize: '18px', marginBottom: '20px' }}>Войдите в аккаунт, чтобы добавлять привычки и отслеживать прогресс.</p>
              <button onClick={() => setShowLogin(true)} style={{ padding: '12px 24px', background: '#1e5fa8', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>
                Войти или зарегистрироваться
              </button>
            </div>
          ) : habitsLoading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Загрузка привычек...</div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </section>

      <section className="app__section" id="contacts" style={{ background: '#f8f9fa' }}>
        <div className="app__container">
          <h2 className="app__title">Контакты</h2>
          <p style={{ textAlign: 'center', color: '#666' }}>
            По всем вопросам пишите: <a href="mailto:support@habittracker.ru" style={{ color: '#1e5fa8' }}>support@habittracker.ru</a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;