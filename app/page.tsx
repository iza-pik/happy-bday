"use client";

import { Input, Message } from "@/components";
import {
  ConfettoType,
  createConfetto,
  generateSpark,
  getRandomNumber,
} from "@/components/Confetto";
import { boom } from "@/utils/audio";
import { useEffect, useRef, useState } from "react";

let confetti: ConfettoType[] = [];

export default function Home() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const canvasEl = useRef(null);
  const ay = 2.5;

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
          confetto.tick(ay);
          // check if out of boundaries
          if (
            confetto.cx > screen.width + radius ||
            confetto.cx < -radius ||
            confetto.cy > screen.height + radius ||
            confetto.cy < -radius
          ) {
            // TODO: reverse the condition
          } else if (!confetto.ttl && !confetto.isSpark) {
            const { cx, cy, colour } = confetto;
            for (let i = 0, lmt = getRandomNumber(5) + 5; i < lmt; i++) {
              tmpConfetti.push(generateSpark(cx, cy, colour, width, height));
            }
          } else {
            tmpConfetti.push(confetto);
          }
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
      {/* <Input /> */}
      <Message />
    </main>
  );
}
