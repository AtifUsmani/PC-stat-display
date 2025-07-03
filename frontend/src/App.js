import React, { useEffect, useState } from "react";
import axios from "axios";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const StatGraph = ({ title, data, color, unit }) => (
  <div className="bg-slate-900 p-4 rounded-2xl shadow-md text-white w-full max-w-sm">
    <h2 className="text-lg font-semibold mb-2 tracking-wide text-cyan-400">{title}</h2>
    <ResponsiveContainer width="100%" height={150}>
      <AreaChart data={data}>
        <XAxis dataKey="time" hide />
        <YAxis hide />
        <Tooltip
          contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
          labelStyle={{ color: "#94a3b8" }}
          itemStyle={{ color }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={color}
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
    <div className="text-sm text-slate-300 mt-2 text-center font-mono">
      Latest: <span className="text-white">{data.length ? data[data.length - 1].value : "--"}</span>{unit}
    </div>
  </div>
);


export default function App() {
  const [stats, setStats] = useState(null);
  const [cpuHistory, setCpuHistory] = useState([]);
  const [ramHistory, setRamHistory] = useState([]);
  const [gpuTempHistory, setGpuTempHistory] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get("/stats");
      const { cpu, ram, gpu } = res.data;
      const time = new Date().toLocaleTimeString().slice(0, 5);

      const cpuAvg = Math.round(cpu.reduce((a, b) => a + b, 0) / cpu.length);

      setCpuHistory(prev => [...prev.slice(-19), { time, value: cpuAvg }]);
      setRamHistory(prev => [...prev.slice(-19), { time, value: ram.percent }]);
      setGpuTempHistory(prev => [...prev.slice(-19), { time, value: gpu.temperature }]);

      setStats(res.data);
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black p-6 flex flex-col items-center gap-6">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl font-bold text-white text-center mb-4 font-orbitron"
      >
        System Monitor
      </motion.h1>

      <StatGraph title="CPU Load" data={cpuHistory} color="#38bdf8" unit="%" />
      <StatGraph title="RAM Usage" data={ramHistory} color="#a78bfa" unit="%" />
      <StatGraph title="GPU Temp" data={gpuTempHistory} color="#f87171" unit="°C" />

      <div className="text-xs text-slate-500 mt-4">Auto-updating every 5 seconds</div>
    </div>
  );
}
