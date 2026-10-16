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