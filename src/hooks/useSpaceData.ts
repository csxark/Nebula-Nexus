import { useState, useEffect } from 'react';
import { ISSPosition, SpaceWeather, Mission, Asteroid, APOD } from '../types/space';

export const useISSPosition = () => {
  const [position, setPosition] = useState<ISSPosition | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchISSPosition = async () => {
      try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        const data = await response.json();
        
        setPosition({
          latitude: parseFloat(data.iss_position.latitude),
          longitude: parseFloat(data.iss_position.longitude),
          altitude: 408, // Average ISS altitude in km
          velocity: 27600, // Average ISS velocity in km/h
          timestamp: data.timestamp * 1000,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ISS position:', error);
        // Fallback mock data for demo
        setPosition({
          latitude: 25.7617,
          longitude: -80.1918,
          altitude: 408,
          velocity: 27600,
          timestamp: Date.now(),
        });
        setLoading(false);
      }
    };

    fetchISSPosition();
    const interval = setInterval(fetchISSPosition, 5000);

    return () => clearInterval(interval);
  }, []);

  return { position, loading };
};

export const useSpaceWeather = () => {
  const [weather, setWeather] = useState<SpaceWeather>({
    solarFlareActivity: 'low',
    geomagneticStorm: 'quiet',
    radiationLevel: 2.3,
    solarWindSpeed: 400,
    lastUpdated: new Date().toISOString(),
  });

  useEffect(() => {
    const updateWeather = () => {
      // Simulate real-time space weather updates
      const activities = ['low', 'moderate', 'high'] as const;
      const storms = ['quiet', 'unsettled', 'storm'] as const;
      
      setWeather({
        solarFlareActivity: activities[Math.floor(Math.random() * activities.length)],
        geomagneticStorm: storms[Math.floor(Math.random() * storms.length)],
        radiationLevel: 2 + Math.random() * 3,
        solarWindSpeed: 350 + Math.random() * 200,
        lastUpdated: new Date().toISOString(),
      });
    };

    const interval = setInterval(updateWeather, 15000);
    return () => clearInterval(interval);
  }, []);

  return weather;
};

export const useAPOD = () => {
  const [apod, setAPOD] = useState<APOD | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        // Using demo APOD data since NASA API requires key
        const mockAPOD: APOD = {
          title: "The Horsehead Nebula in Infrared",
          explanation: "The Horsehead Nebula is one of the most recognizable nebulae in the sky. It is visible as a dark silhouette against the bright red emission nebula IC 434.",
          url: "https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg",
          date: new Date().toISOString().split('T')[0],
          media_type: "image"
        };
        
        setAPOD(mockAPOD);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching APOD:', error);
        setLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  return { apod, loading };
};

export const useMissions = () => {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 'iss',
      name: 'International Space Station',
      status: 'active',
      launchDate: '1998-11-20',
      agency: 'NASA/ESA/Roscosmos',
      type: 'station',
      telemetry: {
        power: 85,
        temperature: 22,
        signalStrength: 95,
        dataRate: 150,
      },
    },
    {
      id: 'perseverance',
      name: 'Mars Perseverance Rover',
      status: 'active',
      launchDate: '2020-07-30',
      agency: 'NASA',
      type: 'rover',
      telemetry: {
        power: 78,
        temperature: -80,
        signalStrength: 72,
        dataRate: 45,
      },
    },
    {
      id: 'jwst',
      name: 'James Webb Space Telescope',
      status: 'active',
      launchDate: '2021-12-25',
      agency: 'NASA/ESA/CSA',
      type: 'probe',
      telemetry: {
        power: 92,
        temperature: -223,
        signalStrength: 88,
        dataRate: 28,
      },
    },
  ]);

  useEffect(() => {
    const updateTelemetry = () => {
      setMissions(prev => prev.map(mission => ({
        ...mission,
        telemetry: {
          ...mission.telemetry,
          power: Math.max(0, Math.min(100, mission.telemetry.power + (Math.random() - 0.5) * 5)),
          signalStrength: Math.max(0, Math.min(100, mission.telemetry.signalStrength + (Math.random() - 0.5) * 3)),
          dataRate: Math.max(0, mission.telemetry.dataRate + (Math.random() - 0.5) * 10),
        },
      })));
    };

    const interval = setInterval(updateTelemetry, 2000);
    return () => clearInterval(interval);
  }, []);

  return missions;
};