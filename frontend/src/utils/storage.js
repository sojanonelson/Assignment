const getToday = () => new Date().toISOString().split("T")[0];

export const getLogs = async () => {
  try {
    const habitData = JSON.parse(localStorage.getItem("habitData") || "{}");

    if (!habitData.logs) {
      habitData.logs = [];
    }

    if (!habitData.name) {
      habitData.name = "Drink Water";
    }

    return habitData;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return { logs: [], name: "Drink Water" };
  }
};

export const markDone = async () => {
  try {
    const today = getToday();
    const habitData = JSON.parse(localStorage.getItem("habitData") || "{}");

    if (!habitData.logs) {
      habitData.logs = [];
    }

    if (!habitData.logs.includes(today)) {
      habitData.logs.push(today);

      habitData.logs.sort();

      localStorage.setItem("habitData", JSON.stringify(habitData));

      return { success: true, logs: habitData.logs };
    }

    return { success: true, logs: habitData.logs };
  } catch (error) {
    console.error("Error writing to localStorage:", error);
    return { success: false, error: error.message };
  }
};

export const resetLogs = async () => {
  try {
    const habitData = JSON.parse(localStorage.getItem("habitData") || "{}");

    const name = habitData.name || "Drink Water";
    localStorage.setItem(
      "habitData",
      JSON.stringify({
        logs: [],
        name,
      })
    );

    return { success: true, logs: [] };
  } catch (error) {
    console.error("Error resetting localStorage:", error);
    return { success: false, error: error.message };
  }
};

export const isIndexedDBSupported = () => {
  return typeof window !== "undefined" && "indexedDB" in window;
};
