"use client";

import { Input } from "@/components";
import { ConfettoType, createConfetto } from "@/components/Confetto";
import { useEffect, useRef, useState } from "react";

let confetti: ConfettoType[] = [];

export default function Home() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const canvasEl = useRef(null);

  useEffect(() => {
    const { width, height } = screen;
    setDimensions({ width, height });
    const draw = () => {
      if (confetti.length < 50)
        confetti.push(createConfetto(screen.width, screen.height));
      if (canvasEl && canvasEl.current) {
        const canvas = canvasEl.current as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        if (ctx === null) return;
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        const tmpConfetti = [];
        for (const confetto of confetti) {
          ctx.beginPath();
          const { cx, cy, vx, vy, radius = 10, colour } = confetto;
          ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = colour;
          ctx.fill();
          ctx.closePath();
          let newConfetto = { ...confetto, cx: cx + vx, cy: cy + vy };
          // check if out of boundaries
          if (
            newConfetto.cx > screen.width + radius ||
            newConfetto.cx < -radius ||
            newConfetto.cy > screen.height + radius ||
            newConfetto.cy < -radius
          ) {
            // generate a new one
            newConfetto = createConfetto(screen.width, screen.height);
          }
          tmpConfetti.push(newConfetto);
        }
        confetti = tmpConfetti;
      }
      setTimeout(draw, 60);
    };
    draw();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <canvas {...dimensions} className="h-screen w-screen" ref={canvasEl} />
      <Input />
    </main>
  );
}
