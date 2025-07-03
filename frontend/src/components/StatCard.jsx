import React from 'react';

export default function StatCard({ title, value }) {
  return (
    <div className="border border-cyan-400 neon-border p-4 rounded-xl bg-black/30 shadow-lg">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-2xl text-lime-300">{value}</p>
    </div>
  );
}