import { useState, useEffect } from "react";
import { getWeatherByCity } from "../services/weatherService";
import LiveClock from "./LiveClock";
import SearchBar from "./SearchBar";
import { dateBuilder } from "../utils/dateBuilder";
import { weatherIcons } from "../utils/weatherIcons";
import { getCityDate } from "../utils/timeUtils";
// import backgroundImages from "../utils/backgroundImages";
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
      timezone: weatherData.timezone,
      feelsLike: Math.round(weatherData.main.feels_like),
      pressure: weatherData.main.pressure,
      windSpeed: weatherData.wind.speed,
      sunrise: weatherData.sys.sunrise,
      sunset: weatherData.sys.sunset,
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

  useEffect(() => {
  const loadDefaultCity = async () => {
    try {
      setLoading(true);
      setError("");

      const weatherData = await getWeatherByCity("Mumbai");

      updateWeather(weatherData);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  loadDefaultCity();
}, []);

  const renderContent = () => {
    if (loading) {
      return <p>Loading weather...</p>;
    }

    if (!weather) {
      return <p>🔍 Search for a city to view weather.</p>;
    }

    const cityDate = getCityDate(weather.timezone);

    const WeatherIcon = weatherIcons[weather.condition] || weatherIcons.Clear;

    return (
      <>
        <div className="weather-header">
          <div>
            <h1>{weather.city}</h1>
            <h3>{weather.country}</h3>
          </div>

          <div className="weather-summary">
            <div className="weather-icon">
              <WeatherIcon size={70} color="#facc15" />
            </div>
            <h2 className="temperature">{weather.temperature}°C</h2>
          </div>
        </div>
        <div className="weather-time">
          <div className="time">
            <LiveClock timezone={weather.timezone} />
          </div>
          <p className="date">{dateBuilder(cityDate)}</p>
        </div>

        <div className="weather-details">
          <p>
            <strong>Condition:</strong> {weather.condition}
          </p>

          {/* <p>
            <strong>Description:</strong> {weather.description}
          </p> */}

          {/* <p>
            <strong>Temperature:</strong> {weather.temperature}°C
          </p> */}

          <p>
            <strong>Feels Like:</strong> {weather.feelsLike}°C
          </p>

          <p>
            <strong>Humidity:</strong> {weather.humidity}%
          </p>

          <p>
            <strong>Wind Speed:</strong> {weather.windSpeed} m/s
          </p>

          {/* <p>
            <strong>Pressure:</strong> {weather.pressure} hPa
          </p>

          <p>
            <strong>Sunrise:</strong> {sunriseTime}
          </p>

          <p>
            <strong>Sunset:</strong> {sunsetTime}
          </p> */}
        </div>
      </>
    );
  };

  return (
    <div className="weather-card right-panel">
      <SearchBar onSearch={handleCitySearch} />

      {error && <p className="error">{error}</p>}

      {renderContent()}
    </div>
  );
}

export default SearchWeatherCard;
