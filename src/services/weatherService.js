const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const GEO_URL = "https://api.openweathermap.org/geo/1.0/";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getCurrentWeather(lat, lon) {
  const response = await fetch(
    `${BASE_URL}weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data.");
  }

  return response.json();
}

export async function getWeatherByCity(city) {
  const geoResponse = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      city,
    )}&limit=1&appid=${API_KEY}`,
  );

  if (!geoResponse.ok) {
    throw new Error("Failed to find city.");
  }

  const locations = await geoResponse.json();

  if (!locations.length) {
    throw new Error("City not found.");
  }

  const location = locations[0];

  const weatherResponse = await fetch(
    `${BASE_URL}weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`,
  );

  if (!weatherResponse.ok) {
    throw new Error("Failed to fetch weather data.");
  }

  const weatherData = await weatherResponse.json();

  // Keep the city/country from the geocoding result
  // instead of relying on the nearest weather station name.
  return {
    ...weatherData,
    name: location.name,
    sys: {
      ...weatherData.sys,
      country: location.country,
    },
  };
}

export async function getForecast(lat, lon) {
  const response = await fetch(
    `${BASE_URL}forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch forecast.");
  }

  return response.json();
}
