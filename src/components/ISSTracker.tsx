import React from 'react';
import { ISSPosition } from '../types/space';
import { Satellite, Globe, Clock, Zap } from 'lucide-react';

interface ISSTrackerProps {
  position: ISSPosition | null;
  loading: boolean;
}

export default function ISSTracker({ position, loading }: ISSTrackerProps) {
  if (loading || !position) {
    return (
      <div className="bg-gray-900/50 backdrop-blur border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Satellite className="w-5 h-5 text-blue-400 animate-pulse" />
          <h3 className="text-lg font-semibold text-white">ISS Live Tracking</h3>
        </div>
        <div className="text-center text-gray-400">Loading ISS position...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur border border-blue-500/30 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Satellite className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">ISS Live Tracking</h3>
        <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Latitude</span>
          </div>
          <div className="text-lg font-mono text-white">
            {position.latitude.toFixed(4)}°
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Longitude</span>
          </div>
          <div className="text-lg font-mono text-white">
            {position.longitude.toFixed(4)}°
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
            <span className="text-sm text-gray-300">Altitude</span>
          </div>
          <div className="text-lg font-mono text-white">
            {position.altitude} km
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Velocity</span>
          </div>
          <div className="text-lg font-mono text-white">
            {(position.velocity / 1000).toFixed(1)} km/s
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-gray-400 mt-4 pt-3 border-t border-gray-700">
        <Clock className="w-3 h-3" />
        <span>Updated: {new Date(position.timestamp).toLocaleTimeString()}</span>
      </div>
      
      {/* Orbital progress indicator */}
      <div className="mt-3">
        <div className="text-xs text-gray-400 mb-1">Orbital Progress</div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-1000"
            style={{ 
              width: `${((Date.now() % (90 * 60 * 1000)) / (90 * 60 * 1000)) * 100}%` 
            }}
          />
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Next orbit: ~{Math.ceil(90 - ((Date.now() % (90 * 60 * 1000)) / (60 * 1000)))} min
        </div>
      </div>
    </div>
  );
}