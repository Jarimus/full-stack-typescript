import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send(`<h1>Hello Full Stack!</h1>`);
});

app.get("/bmi", (req, res) => {
  let height: number;
  let weight: number;
  try {
    height = Number(req.query.height);
    weight = Number(req.query.weight);
  } catch {
    res.status(400).json({"error": "malformatted parameters"}).end();
    return;
  }
  if (!height || !weight) {
    res.status(400).json({"error": "malformatted parameters"}).end();
    return;
  }

  res.json({
      "weight": weight,
      "height": height,
      "bmi": calculateBmi(height, weight)
    });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  // Check both parameters exist
  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }
  // target is a number
  if (typeof Number(target) !== "number" || isNaN(Number(target))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  // daily_exercises must be an array
  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  // Every element of daily_exercises is a number
  const allValidNumbers = daily_exercises.every(
    (val): val is number =>
      typeof Number(val) === "number" && !isNaN(Number(val))
  );
  if (!allValidNumbers || daily_exercises.length === 0) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(daily_exercises.map(n => Number(n)), target as number);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});