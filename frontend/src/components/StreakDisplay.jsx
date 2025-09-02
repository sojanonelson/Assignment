const StreakDisplay = ({ logs, habitName }) => {
  const calculateStreak = () => {
    const today = new Date().toISOString().split("T")[0];
    let streak = 0;
    let currentDate = new Date();

    const todayLogged = logs.includes(today);

    if (!todayLogged) {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    while (logs.includes(currentDate.toISOString().split("T")[0])) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  };

  const streak = calculateStreak();

  return (
    <div className="mb-6 p-5 bg-gradient-to-r from-black via-gray-900 to-green-800 rounded-xl shadow-lg text-green-400 text-center border border-green-600">
      <h2 className="text-lg font-semibold mb-2 text-green-300 tracking-wide">
        Current Streak
      </h2>
      <div className="flex items-baseline justify-center">
        <span className="text-5xl font-extrabold mr-2 text-green-500 drop-shadow-md">
          {streak}
        </span>
        <span className="text-sm text-green-300">
          day{streak !== 1 ? "s" : ""}
        </span>
      </div>
      <p className="text-xs mt-3 text-green-400 opacity-90 italic">
        {streak > 0
          ? `🔥 Keep it going with ${habitName.toLowerCase()}!`
          : `🌱 Start ${habitName.toLowerCase()} today to begin your streak!`}
      </p>
    </div>
  );
};

export default StreakDisplay;
