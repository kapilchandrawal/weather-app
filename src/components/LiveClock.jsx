import { useEffect, useState } from "react";
import { getCityDate } from "../utils/timeUtils";

function LiveClock({ timezone }) {
  const [time, setTime] = useState(getCityDate(timezone));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCityDate(timezone));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timezone]);

  return (
    <h3>
      {time.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })}
    </h3>
  );
}

export default LiveClock;
