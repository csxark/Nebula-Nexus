import React from "react";
import { motion } from "framer-motion";

interface SidebarProps {
  sidebarOpen: boolean;
  onClose: () => void;
  spaceWeather?: any;
  activeMissions?: any[];
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, onClose, spaceWeather, activeMissions }) => {
  const scrollToPanel = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    onClose(); 
  };

  return (
    <motion.aside
      initial={false}
      animate={{
        x: sidebarOpen ? 0 : "-100%",
        opacity: sidebarOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="fixed lg:relative lg:translate-x-0 lg:opacity-100 z-40 w-72 h-screen bg-black/40 backdrop-blur border-r border-blue-500/30 p-4 space-y-6 overflow-y-auto"
    >
      <h2 className="text-xl font-bold text-blue-400">🛰️ Mission Control</h2>

      <nav className="space-y-4 text-sm text-white">
        <button onClick={() => scrollToPanel("mars")} className="hover:text-red-400 block">
          🔴 Mars Weather
        </button>
        <button onClick={() => scrollToPanel("iss")} className="hover:text-yellow-400 block">
          🛰️ ISS Tracker
        </button>
        <button onClick={() => scrollToPanel("apod")} className="hover:text-blue-400 block">
          🌌 NASA APOD
        </button>
        <button onClick={() => scrollToPanel("telemetry")} className="hover:text-green-400 block">
          📡 Telemetry
        </button>
        <button onClick={() => scrollToPanel("spaceweather")} className="hover:text-pink-400 block">
          ☀️ Space Weather
        </button>
      </nav>

      {activeMissions?.length > 0 && (
        <div className="text-xs text-gray-300 mt-6">
          <h3 className="text-sm font-semibold mb-2 text-purple-400">🚀 Active Missions</h3>
          <ul className="list-disc list-inside space-y-1">
            {activeMissions.map((mission, idx) => (
              <li key={idx}>{mission.name}</li>
            ))}
          </ul>
        </div>
      )}

      {spaceWeather && (
        <div className="text-xs text-gray-300 mt-6">
          <h3 className="text-sm font-semibold mb-2 text-pink-400">☀️ Space Weather</h3>
          <p>Solar Wind Speed: <span className="text-white">{spaceWeather.windSpeed} km/s</span></p>
          <p>Radiation Level: <span className="text-white">{spaceWeather.radiation} µSv/h</span></p>
        </div>
      )}
    </motion.aside>
  );
};

export default Sidebar;
