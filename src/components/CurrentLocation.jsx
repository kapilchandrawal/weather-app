import { useEffect, useState } from "react";
import { getCurrentWeather } from "../services/weatherService";

function CurrentLocation() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({
          latitude,
          longitude,
        });

        try {
          const weatherData = await getCurrentWeather(latitude, longitude);
          setWeather(weatherData);
        } catch (err) {
          setError(err.message);
        }

        setLoading(false);
      },
      () => {
        setError("Location access denied.");
        setLoading(false);
      },
    );
  }, []);

  if (loading) {
    return <h2>Loading weather...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h2>Current Weather</h2>

      <pre>{JSON.stringify(weather, null, 2)}</pre>
    </div>
  );
}

export default CurrentLocation;
