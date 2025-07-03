import React, { useEffect, useState } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center mb-4 text-lime-400 text-2xl tracking-widest">
      {time.toLocaleTimeString()}
    </div>
  );
}