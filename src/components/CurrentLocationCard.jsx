import { useEffect, useState } from "react";
import { getCurrentWeather } from "../services/weatherService";
import LiveClock from "./LiveClock";
import { dateBuilder } from "../utils/dateBuilder";
import { weatherIcons } from "../utils/weatherIcons";
import "../styles/WeatherCard.css";

function CurrentLocationCard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const updateWeather = (weatherData) => {
    setWeather({
      city: weatherData.name,
      country: weatherData.sys.country,
      temperature: Math.round(weatherData.main.temp),
      humidity: weatherData.main.humidity,
      condition: weatherData.weather[0].main,
      description: weatherData.weather[0].description,
    });
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const weatherData = await getCurrentWeather(
            position.coords.latitude,
            position.coords.longitude,
          );

          updateWeather(weatherData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied.");
        setLoading(false);
      },
    );
  }, []);

  if (loading) {
    return (
      <div>
        <h2>📍 Detecting your location...</h2>
        <p>Please allow location access to fetch the latest weather.</p>
      </div>
    );
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const WeatherIcon = weatherIcons[weather.condition] || weatherIcons.Clear;

  return (
    <div className="weather-card">
      <h1>{weather.city}</h1>

      <h3>{weather.country}</h3>

      <div className="weather-info">
        <div className="weather-icon">
          <WeatherIcon size={90} color="#facc15" />
        </div>

        <h2 className="temperature">{weather.temperature}°C</h2>

        <div className="time">
          <LiveClock />
        </div>

        <p className="date">{dateBuilder(new Date())}</p>
      </div>

      <div className="weather-details">
        <p>
          <strong>Condition:</strong> {weather.condition}
        </p>

        <p>
          <strong>Description:</strong> {weather.description}
        </p>

        <p>
          <strong>Humidity:</strong> {weather.humidity}%
        </p>
      </div>
    </div>
  );
}

export default CurrentLocationCard;
