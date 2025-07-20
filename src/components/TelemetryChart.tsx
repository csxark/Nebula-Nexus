import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

interface TelemetryData {
  time: string;
  power: number;
  signal: number;
  temperature: number;
}

export default function TelemetryChart() {
  const [data, setData] = useState<TelemetryData[]>([]);

  useEffect(() => {
    const generateData = () => {
      const newPoint: TelemetryData = {
        time: new Date().toLocaleTimeString(),
        power: 80 + Math.random() * 20,
        signal: 70 + Math.random() * 30,
        temperature: 20 + Math.random() * 10,
      };
      
      setData(prev => {
        const updated = [...prev, newPoint];
        return updated.slice(-20); // Keep last 20 points
      });
    };

    // Initialize with some data
    for (let i = 0; i < 10; i++) {
      setTimeout(() => generateData(), i * 100);
    }

    const interval = setInterval(generateData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900/50 backdrop-blur border border-green-500/30 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-green-400" />
        <h3 className="text-lg font-semibold text-white">Real-time Telemetry</h3>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              fontSize={12}
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tick={{ fill: '#9CA3AF' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="power" 
              stroke="#60A5FA" 
              strokeWidth={2}
              dot={false}
              name="Power (%)"
            />
            <Line 
              type="monotone" 
              dataKey="signal" 
              stroke="#34D399" 
              strokeWidth={2}
              dot={false}
              name="Signal (%)"
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#F59E0B" 
              strokeWidth={2}
              dot={false}
              name="Temperature (°C)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <div className="text-xs text-gray-400">Power</div>
          <div className="text-sm font-medium text-blue-400">
            {data.length > 0 ? data[data.length - 1].power.toFixed(1) : '0'}%
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400">Signal</div>
          <div className="text-sm font-medium text-green-400">
            {data.length > 0 ? data[data.length - 1].signal.toFixed(1) : '0'}%
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400">Temperature</div>
          <div className="text-sm font-medium text-yellow-400">
            {data.length > 0 ? data[data.length - 1].temperature.toFixed(1) : '0'}°C
          </div>
        </div>
      </div>
    </div>
  );
}