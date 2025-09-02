import { useState, useEffect } from "react";
import HabitControls from "./components/HabitControls";
import StreakDisplay from "./components/StreakDisplay";
import DaysList from "./components/DaysList";
import LoadingSpinner from "./components/LoadingSpinner";
import Notification from "./components/Notification";
import { getLogs, markDone, resetLogs } from "./utils/storage";

const App = () => {
  const [habitName, setHabitName] = useState("Drink Water");
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };


  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const habitData = await getLogs();
      setLogs(habitData.logs || []);

      if (habitData.name) {
        setHabitName(habitData.name);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
      showNotification("Failed to load habit data", "error");
    } finally {
      setIsLoading(false);
    }
  };



  const handleMarkDone = async () => {
    try {
      setIsLoading(true);
      const response = await markDone();
      if (response.success) {
        setLogs(response.logs);
        showNotification("Habit marked as done for today!");
      } else {
        throw new Error("Failed to mark habit as done");
      }
    } catch (error) {
      console.error("Error marking habit as done:", error);
      showNotification("Failed to mark habit as done", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    if (
      !window.confirm(
        "Are you sure you want to reset all your habit data? This cannot be undone."
      )
    ) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await resetLogs();
      if (response.success) {
        setLogs(response.logs);
        showNotification("Habit data reset successfully");
      } else {
        throw new Error("Failed to reset habit data");
      }
    } catch (error) {
      console.error("Error resetting habit data:", error);
      showNotification("Failed to reset habit data", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setHabitName(newName);

    const habitData = JSON.parse(localStorage.getItem("habitData") || "{}");
    localStorage.setItem(
      "habitData",
      JSON.stringify({
        ...habitData,
        name: newName,
      })
    );
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (isLoading && logs.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white  overflow-hidden p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">
            Habit Logger
          </h1>
          <div className="flex items-center justify-center mt-4">
            <label htmlFor="habit-name" className="mr-2 text-gray-600">
              I will
            </label>
            <input
              id="habit-name"
              type="text"
              value={habitName}
              onChange={handleNameChange}
              className="border-b-2 border-indigo-300 focus:border-indigo-600 focus:outline-none text-center px-2 py-1 text-indigo-700 font-medium"
            />
            <span className="ml-2 text-gray-600">every day</span>
          </div>
        </div>

        <StreakDisplay logs={logs} habitName={habitName} />
        <HabitControls
          onMarkDone={handleMarkDone}
          onReset={handleReset}
          isLoading={isLoading}
          isTodayLogged={logs.includes(new Date().toISOString().split("T")[0])}
        />
        <DaysList logs={logs} />

        {notification.show && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
      </div>
    </div>
  );
};

export default App;
