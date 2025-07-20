import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Satellite, Menu, X, Globe } from 'lucide-react';

// Components
import StarField from './components/StarField';
import Earth3D from './components/Earth3D';
import ISSTracker from './components/ISSTracker';
import MissionPanel from './components/MissionPanel';
import TelemetryChart from './components/TelemetryChart';
import Sidebar from './components/Sidebar'; 

// Hooks
import { useISSPosition, useSpaceWeather, useMissions } from './hooks/useSpaceData';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const { position: issPosition, loading: issLoading } = useISSPosition();
  const spaceWeather = useSpaceWeather();
  const missions = useMissions();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeMissions = missions.filter((m) => m.status === 'active');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-x-hidden">
      <StarField />

      {/* Header */}
      <header className="relative z-50 bg-black/20 backdrop-blur border-b border-blue-500/30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Satellite className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Mission Control
              </h1>
              <div className="text-xs text-gray-400">
                {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-400">All Systems Operational</span>
            </div>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          spaceWeather={spaceWeather}
          activeMissions={activeMissions}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {/* Top Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <div className="bg-gray-900/50 backdrop-blur border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold">Earth Overview</h3>
                  {issPosition && (
                    <span className="ml-auto text-sm text-gray-400">
                      ISS: {issPosition.latitude.toFixed(2)}°, {issPosition.longitude.toFixed(2)}°
                    </span>
                  )}
                </div>
                <div className="h-96">
                  <Earth3D issPosition={issPosition} />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <ISSTracker position={issPosition} loading={issLoading} />

              <div className="bg-gray-900/50 backdrop-blur border border-green-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Mission Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Missions</span>
                    <span className="text-green-400 font-medium">{activeMissions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Satellites Tracked</span>
                    <span className="text-blue-400 font-medium">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Data Points/sec</span>
                    <span className="text-purple-400 font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uptime</span>
                    <span className="text-yellow-400 font-medium">99.9%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="grid grid-cols-1 gap-6">
            <TelemetryChart />
          </div>

        
          <div className="bg-black/40 backdrop-blur border border-gray-700/50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-300">Network: Nominal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-gray-300">Ground Stations: 12 Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-gray-300">Next Pass: ISS in 23min</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-gray-300">Weather: Clear Skies</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
