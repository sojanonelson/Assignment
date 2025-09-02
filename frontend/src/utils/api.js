import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
      throw new Error("Request timeout. Please check your connection.");
    } else if (!error.response) {
      console.error("Network error");
      throw new Error("Network error. Please check your connection.");
    } else {
      throw error;
    }
  }
);

export const getLogs = async () => {
  try {
    const response = await API.get("/habit");
    return response.data;
  } catch (error) {
    console.error("API Error - getLogs:", error);

    if (error.response && error.response.status >= 500) {
      try {
        const localLogs = localStorage.getItem("habitLogs");
        if (localLogs) {
          return { success: true, logs: JSON.parse(localLogs) };
        }
      } catch (localError) {
        console.error("Local storage fallback failed:", localError);
      }
    }

    throw error;
  }
};

export const markDone = async () => {
  const today = new Date().toISOString().split("T")[0];

  try {
    const response = await API.post("/habit/done");

    try {
      const localLogs = localStorage.getItem("habitLogs");
      let logs = localLogs ? JSON.parse(localLogs) : [];

      if (!logs.includes(today)) {
        logs.push(today);
        localStorage.setItem("habitLogs", JSON.stringify(logs));
      }
    } catch (localError) {
      console.error("Failed to update local storage:", localError);
    }

    return response.data;
  } catch (error) {
    console.error("API Error - markDone:", error);

    try {
      const localLogs = localStorage.getItem("habitLogs");
      let logs = localLogs ? JSON.parse(localLogs) : [];

      if (!logs.includes(today)) {
        logs.push(today);
        localStorage.setItem("habitLogs", JSON.stringify(logs));
        return { success: true, logs };
      }

      return { success: true, logs };
    } catch (localError) {
      console.error("Local storage fallback failed:", localError);
      throw error;
    }
  }
};

export const resetLogs = async () => {
  try {
    const response = await API.post("/habit/reset");

    try {
      localStorage.removeItem("habitLogs");
    } catch (localError) {
      console.error("Failed to reset local storage:", localError);
    }

    return response.data;
  } catch (error) {
    console.error("API Error - resetLogs:", error);

    try {
      localStorage.removeItem("habitLogs");
      return { success: true, logs: [] };
    } catch (localError) {
      console.error("Local storage fallback failed:", localError);
      throw error;
    }
  }
};
