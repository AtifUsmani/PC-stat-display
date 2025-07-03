import React from "react";

export function Progress({ value, className = "" }) {
  return (
    <div className={`w-full h-4 bg-gray-800 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-cyan-500 transition-all duration-500"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
