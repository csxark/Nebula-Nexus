import React from "react";
import { useMarsWeather } from "../hooks/useMarsWeather";

const MarsWeather: React.FC = () => {
  const { weather, loading } = useMarsWeather();

  return (
    <div className="bg-gray-900/50 backdrop-blur border border-red-500/30 rounded-lg p-4 text-white">
      <h3 className="text-lg font-semibold mb-3 text-red-400">Mars Weather</h3>

      {loading ? (
        <p className="text-sm text-gray-400">Fetching latest data from Mars...</p>
      ) : weather.length === 0 ? (
        <p className="text-sm text-gray-400">No weather data available.</p>
      ) : (
        <div className="space-y-3">
          {weather.map((day, index) => (
            <div
              key={index}
              className="p-3 bg-black/30 border border-red-500/20 rounded-lg text-sm"
            >
              <div className="flex justify-between">
                <span className="text-red-300 font-medium">
                  {day.terrestrial_date}
                </span>
                <span className="text-gray-400 italic">{day.season}</span>
              </div>
              <div className="mt-1 text-gray-300">
                <div>
                  Min Temp:{" "}
                  <span className="text-white">
                    {day.min_temp != null ? `${day.min_temp}°C` : "N/A"}
                  </span>
                </div>
                <div>
                  Max Temp:{" "}
                  <span className="text-white">
                    {day.max_temp != null ? `${day.max_temp}°C` : "N/A"}
                  </span>
                </div>
                <div>
                  Pressure:{" "}
                  <span className="text-white">
                    {day.pressure != null ? `${day.pressure} Pa` : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarsWeather;
