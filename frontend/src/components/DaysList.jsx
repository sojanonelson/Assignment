
const DaysList = ({ logs }) => {
  const getLast7Days = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const isLogged = logs.includes(dateString);
      const isToday = i === 0;
      
      days.push({
        date: dateString,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        isLogged,
        isToday
      });
    }
    
    return days;
  };

  const last7Days = getLast7Days();

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Last 7 Days</h3>
      <div className="grid grid-cols-7 gap-2">
        {last7Days.map((day) => (
          <div 
            key={day.date} 
            className={`p-2 rounded-lg text-center ${
              day.isLogged 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-gray-100 text-gray-500'
            } ${day.isToday ? 'ring-2 ring-indigo-300' : ''}`}
            title={day.date}
          >
            <div className="text-xs font-medium">{day.dayName}</div>
            <div className="text-sm font-bold">{day.dayNumber}</div>
            <div className={`w-3 h-3 mx-auto mt-1 rounded-full ${day.isLogged ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaysList;