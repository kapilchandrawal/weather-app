function ForecastCard({ forecast }) {
  return (
    <div className="forecast-card">
      <p>{forecast.dt_txt}</p>

      <h3>{Math.round(forecast.main.temp)}°C</h3>

      <p>{forecast.weather[0].main}</p>
    </div>
  );
}

export default ForecastCard;
