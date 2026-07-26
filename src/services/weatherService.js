const BASE_URL = "https://api.openweathermap.org/data/2.5";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getCurrentWeather(lat, lon) {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data.");
  }

  return response.json();
}