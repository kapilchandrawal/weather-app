import { useState } from "react";
import { getWeatherByCity } from "../services/weatherService";
import LiveClock from "./LiveClock";
import SearchBar from "./SearchBar";
import { dateBuilder } from "../utils/dateBuilder";
import { weatherIcons } from "../utils/weatherIcons";
import "../styles/WeatherCard.css";

function SearchWeatherCard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const handleCitySearch = async (city) => {
    try {
      setLoading(true);
      setError("");

      const weatherData = await getWeatherByCity(city);

      updateWeather(weatherData);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <p>Loading weather...</p>;
    }

    if (!weather) {
      return <p>🔍 Search for a city to view weather.</p>;
    }

    const WeatherIcon = weatherIcons[weather.condition] || weatherIcons.Clear;

    return (
      <>
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
      </>
    );
  };

  return (
    <div className="weather-card">
      <SearchBar onSearch={handleCitySearch} />

      {error && <p className="error">{error}</p>}

      {renderContent()}
    </div>
  );
}

export default SearchWeatherCard;
