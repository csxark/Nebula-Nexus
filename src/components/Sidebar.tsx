// components/Sidebar.tsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Mission {
  id: string | number;
  name: string;
  status: string;
}
interface SpaceWeather {
  report?: string;
}
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  spaceWeather?: SpaceWeather | null;
  activeMissions: Mission[];
}

const sidebarVariants = {
  closed: { x: "-100%", transition: { ease: [0.42, 0, 0.58, 1], duration: 0.3 } },
  open: { x: "0%", transition: { ease: [0.42, 0, 0.58, 1], duration: 0.3 } },
};

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  spaceWeather,
  activeMissions,
}: SidebarProps) {
  // Lock scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Overlay Backdrop (mobile only) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            key="sidebar"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 left-0 h-full z-50 w-72 max-w-xs bg-[#0b1120] border-r border-blue-800/30 p-6 flex flex-col shadow-2xl lg:static lg:translate-x-0 lg:flex"
            style={{ minHeight: "100vh" }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-extrabold text-blue-400 tracking-wide">
                Mission Console
              </h2>
              {/* Close button only on mobile */}
              <button
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
                className="lg:hidden p-2 rounded hover:bg-gray-800"
                type="button"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Space Weather Section */}
            <section className="mb-6">
              <h3 className="text-base font-semibold mb-1 text-blue-200">
                Space Weather
              </h3>
              <p className="text-xs text-blue-100">
                {spaceWeather?.report || "No space weather data available."}
              </p>
            </section>

            {/* Active Missions Section */}
            <section>
              <h3 className="text-base font-semibold mb-1 text-purple-200">
                Active Missions
              </h3>
              {activeMissions.length > 0 ? (
                <ul className="pl-4 list-disc space-y-1 text-sm text-purple-100 max-h-60 overflow-y-auto">
                  {activeMissions.map((mission) => (
                    <li key={mission.id}>{mission.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-purple-200">No active missions.</p>
              )}
            </section>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
