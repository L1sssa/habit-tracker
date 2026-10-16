import { StreakBadge } from './components/StreakBadge';

function App() {
  const dates = [
    new Date('2026-10-12'),
    new Date('2026-10-13'),
    new Date('2026-10-14'),
    new Date('2026-10-15'),
    new Date('2026-10-16'),
  ];

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Habit Tracker</h1>
      <p>Тестовая привычка: «Утренняя зарядка»</p>
      <p>
        Streak:{' '}
        <StreakBadge dates={dates} />
      </p>
    </div>
  );
}

export default App;