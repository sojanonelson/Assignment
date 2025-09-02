const HabitControls = ({ onMarkDone, onReset, isLoading, isTodayLogged }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <button
        onClick={onMarkDone}
        disabled={isLoading || isTodayLogged}
        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
          isLoading || isTodayLogged
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg"
        } flex items-center justify-center`}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : isTodayLogged ? (
          "Already Done Today"
        ) : (
          "Mark Done for Today"
        )}
      </button>

      <button
        onClick={onReset}
        disabled={isLoading}
        className="py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
      >
        Reset
      </button>
    </div>
  );
};

export default HabitControls;
