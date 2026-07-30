import { useState } from "react";
import "../styles/WeatherCard.css"

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!city.trim()) {
      return;
    }
    onSearch(city.trim());
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        name="city"
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(event) => setCity(event.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
