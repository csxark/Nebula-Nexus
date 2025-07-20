export interface ISSPosition {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  timestamp: number;
}

export interface Satellite {
  id: string;
  name: string;
  position: {
    lat: number;
    lng: number;
    alt: number;
  };
  velocity: number;
  status: 'operational' | 'warning' | 'critical';
}

export interface SpaceWeather {
  solarFlareActivity: 'low' | 'moderate' | 'high' | 'extreme';
  geomagneticStorm: 'quiet' | 'unsettled' | 'storm' | 'severe';
  radiationLevel: number;
  solarWindSpeed: number;
  lastUpdated: string;
}

export interface Mission {
  id: string;
  name: string;
  status: 'active' | 'planned' | 'completed';
  launchDate: string;
  agency: string;
  type: 'satellite' | 'rover' | 'probe' | 'station';
  telemetry: {
    power: number;
    temperature: number;
    signalStrength: number;
    dataRate: number;
  };
}

export interface Asteroid {
  id: string;
  name: string;
  diameter: number;
  velocity: number;
  distance: number;
  hazardous: boolean;
  closeApproachDate: string;
}

export interface APOD {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  date: string;
  media_type: string;
}