import "./styles/App.css";
import CurrentLocationCard from "./components/CurrentLocationCard";
import SearchWeatherCard from "./components/SearchWeatherCard";

function App() {
  return (
    <main className="dashboard">
      <CurrentLocationCard />
      <SearchWeatherCard />
    </main>
  );
}

export default App;
