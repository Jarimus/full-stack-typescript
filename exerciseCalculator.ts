type rating = 1 | 2 | 3

interface analysis {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: rating,
  ratingDescription: string
}

function calculateExercises(dailyHours: number[], targetAverageHours: number): analysis {
  // number of days
  const periodLength = dailyHours.length
  // number of training days
  const trainingDays = dailyHours.filter( n => n != 0).length
  // the original target average hours
  const target = targetAverageHours
  // calculated average
  const sum = dailyHours.reduce( (t, v) => t + v)
  const average = sum / periodLength
  // target reached (boolean as 0 or 1)
  const success = average >= target
  // rating (1-3)
  const r = average / target
  let ratingDescription: string
  let rating: rating
  if (r >= 1) {
    ratingDescription = "Target reached!"
    rating = 3
  } else if (r >= 0.5) {
    ratingDescription = "Good effort!"
    rating = 2
  } else {
    ratingDescription = "More effort next time!"
    rating = 1
  }
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  }
}

try {
  const dailyHoursString = process.argv.slice(3)
  const dailyHours = dailyHoursString.map( n => Number(n))
  const target = Number(process.argv[2])
  console.log(calculateExercises(dailyHours, target))
} catch {
  console.log(`Usage: <target average per day> <daily hours, space-separated>`)
  process.exit(1)
}