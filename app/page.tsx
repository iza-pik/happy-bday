"use client";

import burst from "../assets/burst.mp3";
import woosh from "../assets/woosh.mp3";
import bigBoom from "../assets/big-boom.mp3";
import { Input, Message, SoundButton } from "@/components";
import {
  FireworkType,
  MAX_FIREWORK_TRACE,
  createFirework,
  generateSpark,
  getRandomNumber,
} from "@/components/Firework";
import { useEffect, useRef, useState } from "react";

let fireworks: FireworkType[] = [];
const MAX_FIREWORKS = 15;
const sfx = [
  Array.from({ length: MAX_FIREWORKS }, () => {
    const audio = new Audio(burst);
    audio.volume = 0.01;
    return audio;
  }),
  Array.from({ length: MAX_FIREWORKS }, () => {
    const audio = new Audio(woosh);
    audio.playbackRate = 4;
    audio.volume = 0.005;
    return audio;
  }),
  Array.from({ length: MAX_FIREWORKS }, () => {
    const audio = new Audio(bigBoom);
    audio.volume = 0.01;
    return audio;
  }),
];

let canvasAudioOn = false;

export default function Home() {
  const [dimensions, setDimensions] = useState({
    width: screen.width,
    height: screen.height,
  });
  const [isAudioOn, setIsAudioOn] = useState(false);
  const canvasEl = useRef(null);
  const ay = 0.18;

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    canvasAudioOn = !canvasAudioOn;
  };

  const draw = () => {
    const { width, height } = dimensions;
    let sfxIdxs = Array.from({ length: sfx.length }, () => 0);
    if (fireworks.length < 50)
      fireworks.push(createFirework(screen.width, screen.height));
    if (canvasEl && canvasEl.current) {
      const canvas = canvasEl.current as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (ctx === null) return;
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      const tmpConfetti = [];
      for (const firework of fireworks) {
        let currAlpha = 1;
        const alphaStep = 1 / MAX_FIREWORK_TRACE;
        const { positions, radius = 10, colour } = firework;
        for (const [cx, cy] of positions) {
          ctx.globalAlpha = currAlpha;
          currAlpha -= alphaStep;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = colour;
          ctx.fill();
          ctx.closePath();
        }
        firework.tick(ay);
        // check if out of boundaries
        if (
          firework.cx > screen.width + radius ||
          firework.cx < -radius ||
          firework.cy > screen.height + radius ||
          firework.cy < -radius
        ) {
          continue;
        }
        // firework out of ttl and explodes
        else if (!firework.ttl && !firework.isSpark) {
          const { cx, cy, colour } = firework;
          for (let i = 0, lmt = getRandomNumber(5) + 10; i < lmt; i++) {
            tmpConfetti.push(generateSpark(cx, cy, colour, width, height));
            // picking the right audio effect, if audio is on
            if (canvasAudioOn) {
              const sfxIdx = Math.floor(Math.random() * sfx.length);
              sfx[sfxIdx][sfxIdxs[sfxIdx]++].play();
              if (sfxIdxs[sfxIdx] === MAX_FIREWORKS) sfxIdxs[sfxIdx] = 0;
            }
          }
        }
        // default case: pushing firework back with updated values
        else {
          tmpConfetti.push(firework);
        }
      }
      fireworks = tmpConfetti;
    }
    setTimeout(draw, 8);
  };

  useEffect(draw, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <canvas {...dimensions} className="h-screen w-screen" ref={canvasEl} />
      <Message />
      <SoundButton isAudioOn={isAudioOn} onClick={toggleAudio} />
    </main>
  );
}
