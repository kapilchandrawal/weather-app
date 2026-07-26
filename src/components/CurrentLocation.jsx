import { useEffect, useState } from "react";

function CurrentLocation() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLoading(false);
      },
      () => {
        setError("Location access denied. Please enable location services.");
        setLoading(false);
      },
    );
  }, []);

  if (loading) {
    return (
      <div>
        <h2>Detecting your location...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Location Detected</h2>

      <p>
        <strong>Latitude:</strong> {location.latitude}
      </p>

      <p>
        <strong>Longitude:</strong> {location.longitude}
      </p>
    </div>
  );
}

export default CurrentLocation;
