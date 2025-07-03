// File: src/App.jsx
import React, { useEffect, useState } from "react";
import "./index.css";

const StatBar = ({ label, percent, color }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full h-4 bg-gray-800 rounded-full shadow-inner">
        <div
          className={`h-full rounded-full shadow-lg`}
          style={{ width: `${percent}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};

function App() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return <div className="text-center text-neon-blue mt-20 animate-pulse">Loading cyber data...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0f0f1c] text-cyber font-orbitron">
      <h1 className="text-4xl font-bold mb-8 text-neon-pink drop-shadow-md">CYBERPUNK SYSTEM MONITOR</h1>
      <div className="w-full max-w-md space-y-4">
        <StatBar label="CPU" percent={stats.cpu.reduce((a, b) => a + b, 0) / stats.cpu.length} color="#39ff14" />
        <StatBar label="RAM" percent={stats.ram.percent} color="#00f0ff" />
        <StatBar label="Disk" percent={stats.disk.percent} color="#f7ff00" />
        <StatBar label={`GPU (${stats.gpu.name})`} percent={stats.gpu.load} color="#ff00f7" />
      </div>
      <footer className="mt-8 text-sm text-gray-500">Made by LustyLinuxUser ⚡</footer>
    </div>
  );
}

export default App;
