import React from 'react';
import { Mission } from '../types/space';
import { Activity, Battery, Thermometer, Wifi, Database } from 'lucide-react';

interface MissionPanelProps {
  mission: Mission;
}

const getStatusColor = (status: Mission['status']) => {
  switch (status) {
    case 'active': return 'text-green-400 bg-green-400/20';
    case 'planned': return 'text-yellow-400 bg-yellow-400/20';
    case 'completed': return 'text-gray-400 bg-gray-400/20';
    default: return 'text-gray-400 bg-gray-400/20';
  }
};

const getTelemetryColor = (value: number, type: 'percentage' | 'temperature' | 'signal') => {
  if (type === 'percentage') {
    if (value >= 80) return 'text-green-400';
    if (value >= 50) return 'text-yellow-400';
    return 'text-red-400';
  }
  if (type === 'temperature') {
    if (Math.abs(value) < 50) return 'text-green-400';
    if (Math.abs(value) < 100) return 'text-yellow-400';
    return 'text-red-400';
  }
  if (type === 'signal') {
    if (value >= 80) return 'text-green-400';
    if (value >= 50) return 'text-yellow-400';
    return 'text-red-400';
  }
  return 'text-white';
};

export default function MissionPanel({ mission }: MissionPanelProps) {
  return (
    <div className="bg-gray-900/50 backdrop-blur border border-blue-500/30 rounded-lg p-4 hover:border-blue-400/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">{mission.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mission.status)}`}>
          {mission.status.toUpperCase()}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-sm">
          <span className="text-gray-400">Agency:</span>
          <div className="text-white font-medium">{mission.agency}</div>
        </div>
        <div className="text-sm">
          <span className="text-gray-400">Type:</span>
          <div className="text-white font-medium capitalize">{mission.type}</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Battery className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Power</span>
          </div>
          <span className={`text-sm font-medium ${getTelemetryColor(mission.telemetry.power, 'percentage')}`}>
            {mission.telemetry.power.toFixed(1)}%
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Temperature</span>
          </div>
          <span className={`text-sm font-medium ${getTelemetryColor(mission.telemetry.temperature, 'temperature')}`}>
            {mission.telemetry.temperature.toFixed(1)}°C
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">Signal</span>
          </div>
          <span className={`text-sm font-medium ${getTelemetryColor(mission.telemetry.signalStrength, 'signal')}`}>
            {mission.telemetry.signalStrength.toFixed(1)}%
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Data Rate</span>
          </div>
          <span className="text-sm font-medium text-white">
            {mission.telemetry.dataRate.toFixed(1)} Mbps
          </span>
        </div>
      </div>
      
      {/* Telemetry bars */}
      <div className="mt-4 space-y-2">
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div 
            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${mission.telemetry.power}%` }}
          />
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-400 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${mission.telemetry.signalStrength}%` }}
          />
        </div>
      </div>
    </div>
  );
}