
import { Sun, Zap, Shield, Wind, Info } from 'lucide-react';


interface SpaceWeather {
  solarFlareActivity: string;
  geomagneticStorm: string;
  radiationLevel: number;
  solarWindSpeed: number;
  lastUpdated: string | number | Date;
}

type ActivityLevel =
  | 'low'
  | 'quiet'
  | 'moderate'
  | 'unsettled'
  | 'high'
  | 'storm'
  | 'extreme'
  | 'severe'
  | string;

const getActivityColor = (activity: ActivityLevel): string => {
  switch (activity) {
    case 'low':
    case 'quiet':
      return 'text-green-300 bg-green-600/30 ring-1 ring-green-500/40';
    case 'moderate':
    case 'unsettled':
      return 'text-yellow-200 bg-yellow-600/30 ring-1 ring-yellow-400/40';
    case 'high':
    case 'storm':
      return 'text-orange-300 bg-orange-700/30 ring-1 ring-orange-500/40 animate-pulse';
    case 'extreme':
    case 'severe':
      return 'text-red-300 bg-red-700/40 ring-2 ring-red-500/70 animate-pulse';
    default:
      return 'text-gray-400 bg-gray-700/40 ring-1 ring-gray-700/50';
  }
};

export default function SpaceWeatherPanel({ weather }) {
  return (
    <div
      className="
        group
        bg-gradient-to-br from-[#181629] to-[#211940]
        border border-purple-500/30 shadow-lg
        rounded-xl px-6 py-5
        transition
        relative
        hover:scale-[1.017] hover:shadow-2xl
        duration-300
        overflow-hidden
      "
      tabIndex={0}
      aria-label="Space Weather Panel"
    >
      <div className="flex items-center gap-3 mb-3">
        <Sun className="w-6 h-6 text-yellow-400 group-hover:rotate-[16deg] group-hover:scale-110 transition duration-500" />
        <h3 className="text-xl font-bold text-white tracking-wide">Space Weather</h3>
        <span className="ml-auto">
          <Info className="w-4 h-4 text-gray-400 opacity-60" title="Live space weather courtesy of SWPC, NOAA" />
        </span>
      </div>
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-300 animate-spin-slow" />
            <span className="text-base text-gray-200">Solar Flare Activity</span>
          </div>
          <span className={`px-2.5 py-1.5 rounded-lg font-semibold text-xs uppercase shadow-md transition ${getActivityColor(weather.solarFlareActivity)}`}>
            {weather.solarFlareActivity}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-300" />
            <span className="text-base text-gray-200">Geomagnetic Storm</span>
          </div>
          <span className={`px-2.5 py-1.5 rounded-lg font-semibold text-xs uppercase shadow-md ${getActivityColor(weather.geomagneticStorm)}`}>
            {weather.geomagneticStorm}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 shadow-md" />
            <span className="text-base text-gray-200">Radiation Level</span>
          </div>
          <span className="text-base font-bold text-white drop-shadow">{weather.radiationLevel.toFixed(1)} <span className="text-xs text-pink-300 font-semibold">MeV</span></span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-cyan-300 animate-wiggle" />
            <span className="text-base text-gray-200">Solar Wind Speed</span>
          </div>
          <span className="text-base font-bold text-white drop-shadow">{weather.solarWindSpeed.toFixed(0)} <span className="text-xs text-cyan-300 font-semibold">km/s</span></span>
        </div>
      </div>

      {/* Radiation Bar */}
      <div className="mt-4">
        <div className="mb-1 flex justify-between items-center">
          <span className="text-xs text-gray-400">Radiation Index</span>
          <span className="text-xs text-pink-200 font-semibold">{Math.min((weather.radiationLevel / 5) * 100, 100).toFixed(0)}%</span>
        </div>
        <div className="w-full bg-[#29213b] rounded-full h-2 shadow-inner relative overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${Math.min((weather.radiationLevel / 5) * 100, 100)}%` }}
          />
          {/* Little indicator blob */}
          <div
            className="absolute h-4 w-4 rounded-full bg-pink-400/40 top-1/2 -translate-y-1/2 shadow-lg -right-2 transition-all duration-1000"
            style={{
              left: `calc(${Math.min((weather.radiationLevel / 5) * 100, 100)}% - 1rem)`
            }}
          />
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between items-center">
        <div className="text-xs text-gray-400">
          Last Updated:&nbsp;
          <span className="font-medium text-gray-300">
            {new Date(weather.lastUpdated).toLocaleTimeString()}
          </span>
        </div>
        {/* Optional live indicator */}
        <span className="flex items-center gap-1 text-xs text-green-400 font-bold animate-pulse">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          LIVE
        </span>
      </div>
    </div>
  );
}