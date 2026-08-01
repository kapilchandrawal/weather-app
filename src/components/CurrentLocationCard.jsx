import { useEffect, useState } from "react";
import { getCurrentWeather, getForecast } from "../services/weatherService";
import LiveClock from "./LiveClock";
import { dateBuilder } from "../utils/dateBuilder";
import { weatherIcons } from "../utils/weatherIcons";
import { getCityDate } from "../utils/timeUtils";
import backgroundImages from "../utils/backgroundImages";
import ForecastList from "./ForecastList";
import "../styles/WeatherCard.css";

function CurrentLocationCard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState([]);

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

          const forecastData = await getForecast(
            position.coords.latitude,
            position.coords.longitude,
          );
          setForecast(forecastData.list.slice(0, 5));
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
      <div className="location-state">
        <div className="location-state-content">
          <div className="location-icon">☁️</div>

          <h2>Detecting your location</h2>

          <p>
            Your current location will be used to display
            <br />
            local weather information.
          </p>

          <div className="location-loader"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="location-state">
        <div className="location-state-content">
          <div className="location-icon">📍</div>

          <h2>Unable to detect your location</h2>

          <p>{error}</p>

          <p className="location-help">
            Please allow location access and refresh the page.
          </p>
        </div>
      </div>
    );
  }

  const cityDate = getCityDate(weather.timezone);

  const WeatherIcon = weatherIcons[weather.condition] || weatherIcons.Clear;

  const background =
    backgroundImages[weather.condition] || backgroundImages.Clear;

  return (
    <div
      className="weather-card left-panel"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
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
      <ForecastList forecasts={forecast} />
    </div>
  );
}

export default CurrentLocationCard;
