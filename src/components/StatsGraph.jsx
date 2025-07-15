import { useRef, useEffect, useState } from 'react';
import React from 'react';
const StatsGraph = ({ actualSpeed }) => {
  const canvasRef = useRef(null);
  const [speedData, setSpeedData] = useState([]);
  const [timeData, setTimeData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString().slice(3, 8);  
      const speed = parseFloat(actualSpeed || 0);

      setSpeedData((prev) => [...prev.slice(-9), speed]);
      setTimeData((prev) => [...prev.slice(-9), newTime]);
    }, 3000);  

    return () => clearInterval(interval);
  }, [actualSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, width, height);

    // Axis
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 0);
    ctx.lineTo(40, height);
    ctx.moveTo(0, height - 20);
    ctx.lineTo(width, height - 20);
    ctx.stroke();

    // Data line
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2;
    ctx.beginPath();

    const maxSpeed = 20;
    const xStep = (width - 40) / (speedData.length + 1);
    const yScale = (height - 40) / maxSpeed;

    speedData.forEach((speed, index) => {
      const x = 40 + index * xStep;
      const y = height - 20 - speed * yScale;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    
    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px sans-serif";

    timeData.forEach((time, index) => {
      const x = 40 + index * xStep;
      ctx.fillText(time, x - 10, height - 5);
    });

     
    ctx.fillText("Speed (km/h)", 5, 10);
  }, [speedData, timeData]);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-gray-900 p-6 rounded-2xl shadow-xl mb-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-green-300 mb-4">📈 Speed Graph</h2>

      <div className="overflow-x-auto">
        <canvas
          ref={canvasRef}
          width={350}
          height={180}
          className="border border-green-400 rounded-lg bg-slate-800"
        ></canvas>
      </div>

      <p className="text-xs text-gray-400 text-center mt-2">Live speed updates (simulated)</p>
    </div>
  );
};

export default StatsGraph;
