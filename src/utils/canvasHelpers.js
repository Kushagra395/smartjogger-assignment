export const drawSpeedGraph = (ctx, width, height, speedData, timeData) => {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#10b981";
  ctx.lineWidth = 2;

  const maxSpeed = 20;
  const xStep = width / (speedData.length + 1);
  const yScale = height / maxSpeed;

  ctx.beginPath();
  speedData.forEach((speed, index) => {
    const x = index * xStep + xStep;
    const y = height - speed * yScale;
    index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = "#cbd5e1";
  ctx.font = "10px sans-serif";
  timeData.forEach((time, index) => {
    const x = index * xStep + xStep;
    ctx.fillText(time, x - 10, height - 5);
  });
};

