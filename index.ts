import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()

app.get("/hello", (_req, res) => {
  res.send(`<h1>Hello Full Stack!</h1>`)
})

app.get("/bmi", (req, res) => {
  let height: number
  let weight: number
  try {
    height = Number(req.query.height)
    weight = Number(req.query.weight)
  } catch {
    res.status(400).json({"error": "malformatted parameters"}).end()
    return
  }
  if (!height || !weight) {
    res.status(400).json({"error": "malformatted parameters"}).end()
    return
  }

  res.json({
      "weight": weight,
      "height": height,
      "bmi": calculateBmi(height, weight)
    })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log("Server running on port", PORT)
})