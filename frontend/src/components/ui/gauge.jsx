import React from "react";

export function Gauge({ value = 0, label = "", unit = "%", className = "" }) {
  const strokeWidth = 10;
  const size = 100;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={`flex flex-col items-center text-cyan-400 ${className}`}>
      <svg width={size} height={size} className="rotate-180">
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#2d2d2d"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#22d3ee"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="text-sm mt-1 text-center">
        <span className="text-lg font-bold text-white">{Math.round(value)}{unit}</span><br />
        <span className="text-xs text-gray-400">{label}</span>
      </div>
    </div>
  );
}
