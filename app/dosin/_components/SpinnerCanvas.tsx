"use client";

import { useEffect, useRef } from "react";

export default function SpinnerCanvas({
  items,
  onResult,
}: {
  items: string[];
  onResult: (value: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colors = useRef<string[]>([]);
  const currentAngle = useRef(0);

  const colorMap: Record<string, string> = {
    "rgb(232,221,113)": "1",
    "rgb(80,165,62)": "3",
    "rgb(67,110,163)": "5",
    "rgb(170,96,162)": "10",
    "rgb(168,86,43)": "20",
  };

  const draw = (
    ctx: CanvasRenderingContext2D,
    items: string[],
    angleDeg: number
  ) => {
    const canvas = ctx.canvas;
    const cw = canvas.width / 2;
    const ch = canvas.height / 2;
    const arc = (Math.PI * 2) / items.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 회전
    ctx.save();
    ctx.translate(cw, ch);
    ctx.rotate((-angleDeg * Math.PI) / 180);
    ctx.translate(-cw, -ch);

    for (let i = 0; i < items.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = colors.current[i];
      ctx.moveTo(cw, ch);
      ctx.arc(cw, ch, cw, arc * i - Math.PI / 2, arc * (i + 1) - Math.PI / 2);
      ctx.fill();
      ctx.closePath();
    }

    // 텍스트
    ctx.fillStyle = "#fff";
    ctx.font = "bold 18px Pretendard";
    ctx.textAlign = "center";

    for (let i = 0; i < items.length; i++) {
      const angle = arc * i + arc / 2 - Math.PI / 2;
      const x = cw + Math.cos(angle) * (cw - 50);
      const y = ch + Math.sin(angle) * (ch - 50);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);
      ctx.fillText(items[i], 0, 0);
      ctx.restore();
    }

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width / 2;
    const ch = canvas.height / 2;
    const arc = (Math.PI * 2) / items.length;

    // 색상 준비
    const fixedColors: Record<string, string> = {
      "1": "#E8DD71",
      "3": "#50A53E",
      "5": "#436EA3",
      "10": "#AA60A2",
      "20": "#A8562B",
    };
    colors.current = items.map((item) => fixedColors[item]);

    // 최초 draw
    draw(ctx, items, currentAngle.current);

    const rotateHandler = () => {
      const degPerItem = 360 / items.length;
      const spinRounds = Math.floor(Math.random() * 3) + 5;
      const extraDeg = Math.random() * 360;
      const totalDeg = spinRounds * 360 + extraDeg;
      const step = 4;
      const duration = 4000;
      const frames = duration / (1000 / 60);
      let frame = 0;

      const animate = () => {
        frame++;
        const progress = frame / frames;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = totalDeg * easeOut;
        currentAngle.current = current % 360;

        draw(ctx, items, currentAngle.current);

        if (frame < frames) {
          requestAnimationFrame(animate);
        } else {
          // 픽셀 추출
          const imageData = ctx.getImageData(cw, ch - cw + 1, 1, 1).data;
          const rgb = `rgb(${imageData[0]},${imageData[1]},${imageData[2]})`;
          const result = colorMap[rgb] ?? "꽝";
          onResult(result);
        }
      };

      requestAnimationFrame(animate);
    };

    canvas.addEventListener("rotate", rotateHandler);
    return () => {
      canvas.removeEventListener("rotate", rotateHandler);
    };
  }, [items, onResult]);

  return (
    <canvas
      ref={canvasRef}
      id="spinner"
      width={250}
      height={250}
      className="mt-10"
    />
  );
}
