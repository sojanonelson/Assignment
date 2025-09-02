import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let habitData = { logs: [] };


app.post("/api/habit/done", (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  if (!habitData.logs.includes(today)) {
    habitData.logs.push(today);
  }
  res.json({ success: true, logs: habitData.logs });
});

app.get("/api/habit", (req, res) => {
  res.json({ logs: habitData.logs });
});


app.post("/api/habit/reset", (req, res) => {
  habitData.logs = [];
  res.json({ success: true, logs: habitData.logs });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
