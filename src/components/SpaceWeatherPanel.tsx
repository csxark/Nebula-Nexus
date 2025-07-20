import React from 'react';
import { SpaceWeather } from '../types/space';
import { Sun, Zap, Shield, Wind } from 'lucide-react';

interface SpaceWeatherPanelProps {
  weather: SpaceWeather;
}

const getActivityColor = (activity: string) => {
  switch (activity) {
    case 'low': case 'quiet': return 'text-green-400 bg-green-400/20';
    case 'moderate': case 'unsettled': return 'text-yellow-400 bg-yellow-400/20';
    case 'high': case 'storm': return 'text-orange-400 bg-orange-400/20';
    case 'extreme': case 'severe': return 'text-red-400 bg-red-400/20';
    default: return 'text-gray-400 bg-gray-400/20';
  }
};

export default function SpaceWeatherPanel({ weather }: SpaceWeatherPanelProps) {
  return (
    <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Sun className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-semibold text-white">Space Weather</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Solar Flare Activity</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(weather.solarFlareActivity)}`}>
            {weather.solarFlareActivity.toUpperCase()}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Geomagnetic Storm</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(weather.geomagneticStorm)}`}>
            {weather.geomagneticStorm.toUpperCase()}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
            <span className="text-sm text-gray-300">Radiation Level</span>
          </div>
          <span className="text-sm font-medium text-white">
            {weather.radiationLevel.toFixed(1)} MeV
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Solar Wind Speed</span>
          </div>
          <span className="text-sm font-medium text-white">
            {weather.solarWindSpeed.toFixed(0)} km/s
          </span>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-700">
        <div className="text-xs text-gray-400">
          Last Updated: {new Date(weather.lastUpdated).toLocaleTimeString()}
        </div>
      </div>
      
      {/* Radiation level visualization */}
      <div className="mt-3">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${Math.min((weather.radiationLevel / 5) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}