import { useState, useEffect } from "react";
import { getLogs, markDone, resetLogs } from "../utils/api";
import HabitControls from "../components/HabitControls";
import StreakDisplay from "../components/StreakDisplay";
import DaysList from "../components/DaysList";

const Home = () => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const res = await getLogs();
    setLogs(res.data.logs);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleMarkDone = async () => {
    await markDone();
    fetchLogs();
  };

  const handleReset = async () => {
    await resetLogs();
    fetchLogs();
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">Tiny Habit Logger</h1>

      <StreakDisplay logs={logs} />
      <HabitControls onMarkDone={handleMarkDone} onReset={handleReset} />
      <DaysList logs={logs} />
    </div>
  );
};

export default Home;
