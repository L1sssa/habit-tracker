import { calculateStreak } from '../utils/streakUtils';
import './StreakBadge.css';

interface StreakBadgeProps {
  dates: string[];
}

export const StreakBadge = ({ dates }: StreakBadgeProps) => {
  const streak = calculateStreak(dates);

  return (
    <div className="streak-badge">
      <span>{streak}</span>
    </div>
  );
};