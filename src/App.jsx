import "./styles/App.css";
import CurrentLocationCard from "./components/CurrentLocationCard";
import SearchWeatherCard from "./components/SearchWeatherCard";

function App() {
  return (
    <main className="dashboard">
      <div className="weather-dashboard">
        <CurrentLocationCard />
        <SearchWeatherCard />
      </div>
    </main>
  );
}

export default App;
