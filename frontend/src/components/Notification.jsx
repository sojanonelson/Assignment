const Notification = ({ message, type = "success" }) => {
  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div
        className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center`}
      >
        {type === "error" ? (
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        )}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Notification;
