import React from 'react';
import { APOD } from '../types/space';
import { Image, Calendar, ExternalLink } from 'lucide-react';

interface APODPanelProps {
  apod: APOD | null;
  loading: boolean;
}

export default function APODPanel({ apod, loading }: APODPanelProps) {
  if (loading || !apod) {
    return (
      <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Image className="w-5 h-5 text-purple-400 animate-pulse" />
          <h3 className="text-lg font-semibold text-white">Astronomy Picture of the Day</h3>
        </div>
        <div className="text-center text-gray-400">Loading APOD...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Image className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Astronomy Picture of the Day</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-white font-medium mb-2">{apod.title}</h4>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Calendar className="w-4 h-4" />
            <span>{new Date(apod.date).toLocaleDateString()}</span>
          </div>
        </div>
        
        {apod.media_type === 'image' && (
          <div className="relative group">
            <img 
              src={apod.url} 
              alt={apod.title}
              className="w-full h-32 object-cover rounded-lg border border-purple-500/20"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-white" />
            </div>
          </div>
        )}
        
        <p className="text-sm text-gray-300 line-clamp-3">
          {apod.explanation}
        </p>
        
        <button 
          onClick={() => window.open(apod.hdurl || apod.url, '_blank')}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-sm font-medium"
        >
          View Full Image
        </button>
      </div>
    </div>
  );
}