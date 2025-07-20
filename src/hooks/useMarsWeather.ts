import { useEffect, useState } from "react";

interface MarsWeather {
  terrestrial_date: string;
  min_temp: number;
  max_temp: number;
  pressure: number;
  season: string;
}

export function useMarsWeather() {
  const [weather, setWeather] = useState<MarsWeather[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mars.nasa.gov/rss/api/?feed=weather&category=insight&feedtype=json")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.soles) {
          const latest = data.soles.slice(0, 5).map((entry: any) => ({
            terrestrial_date: entry.terrestrial_date,
            min_temp: entry.min_temp,
            max_temp: entry.max_temp,
            pressure: entry.pressure,
            season: entry.season,
          }));
          setWeather(latest);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { weather, loading };
}
