import { useEffect, useState } from "react";

interface MarsWeather {
  terrestrial_date: string;
  min_temp: number;
  max_temp: number;
  pressure: number;
  season: string;
}

export function useMarsWeather() {
  const [weather, setWeather] = useState<MarsWeather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.maas2.apollorion.com/")
      .then((res) => res.json())
      .then((data) => {
        const formatted: MarsWeather = {
          terrestrial_date: data.terrestrial_date,
          min_temp: data.min_temp,
          max_temp: data.max_temp,
          pressure: data.pressure,
          season: data.season,
        };
        setWeather(formatted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { weather, loading };
}
