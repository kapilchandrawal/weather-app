import ForecastCard from "./ForecastCard";

function ForecastList({ forecasts }) {
  return (
    <div className="forecast-list">
      {forecasts.map((forecast) => (
        <ForecastCard key={forecast.dt} forecast={forecast} />
      ))}
    </div>
  );
}

export default ForecastList;
