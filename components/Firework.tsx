export const MAX_FIREWORK_TRACE = 4;

export interface FireworkType {
  cx: number;
  cy: number;
  vx: number;
  vy: number;
  radius: number;
  colour: string;
  tick: (ay: number) => void;
  ttl: number;
  isSpark: boolean;
  positions: number[][];
}

export const Firework = function (
  this: FireworkType,
  x: number,
  y: number,
  vx: number,
  vy: number,
  radius: number,
  colour: string,
  ttl: number,
  isSpark = false
) {
  this.cx = x;
  this.cy = y;
  this.vx = vx;
  this.vy = vy;
  this.radius = radius;
  this.colour = colour;
  this.tick = (ay: number) => {
    this.positions.unshift([this.cx, this.cy]);
    if (this.positions.length > MAX_FIREWORK_TRACE) this.positions.pop();
    this.cx += this.vx;
    this.cy += this.vy;
    this.vy += ay;
    if (isSpark) this.radius *= 0.98;
    else this.ttl--;
  };
  this.ttl = ttl;
  this.isSpark = isSpark;
  this.positions = [];
};

export const getRandomColour = () => Math.floor(Math.random() * 256).toString();

export const getRandomNumber = (size: number) =>
  Math.floor(Math.random() * size);

export const getRandomSpeed = (size: number, canBePositive = true) => {
  const onePercent = size / 100;
  return (
    ((canBePositive && Math.random() < 0.5 ? 1 : -1) *
      (Math.floor(Math.random() * onePercent) + onePercent)) /
    4
  );
};

export const getRandomTimeToLeave = () => {
  return Math.floor(Math.random() * 40) + 40;
};

export const createFirework = (width: number, height: number) => {
  const newX = width / 2;
  const newY = height;
  const newVX = getRandomSpeed(width);
  const newVY = getRandomSpeed(height * 4, false);
  const newTtl = getRandomTimeToLeave();
  const newRadius = 5;
  const newColour = `rgb(${getRandomColour()}, ${getRandomColour()}, ${getRandomColour()})`;
  // @ts-ignore
  return new Firework(newX, newY, newVX, newVY, newRadius, newColour, newTtl);
};

export const generateSpark = (
  x: number,
  y: number,
  colour: string,
  width: number,
  height: number
) => {
  const newX = x;
  const newY = y;
  const newVX = getRandomSpeed(width);
  const newVY = getRandomSpeed(height);
  const newTtl = getRandomTimeToLeave();
  const newRadius = 4;
  const newColour = colour;
  // @ts-ignore
  return new Firework(
    newX,
    newY,
    newVX,
    newVY,
    newRadius,
    newColour,
    newTtl,
    true
  );
};
