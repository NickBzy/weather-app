const API_KEY = "GNRZMCJKHQY4LHNFSCLUG6EZP"

async function fetchWeather(city, unit) {
  if (unit === "c") {
    unit = "metric"
  } else if (unit === "f") {
    unit = "us"
  }

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_KEY}&include=days&unitGroup=${unit}`
  const response = await fetch(url, { mode: "cors" })
  if (!response.ok) {
    throw new Error("Failed to fetch weather data")
  }

  const json = await response.json()
  return json
}

export { fetchWeather }
