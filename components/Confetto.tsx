export interface ConfettoType {
  cx: number;
  cy: number;
  vx: number;
  vy: number;
  radius: number;
  colour: string;
}

interface ConfettiFactory {
  new (
    cx: number,
    cy: number,
    vx: number,
    vy: number,
    radius: number,
    colour: string
  ): ConfettoType;
}

export const Confetto = function (
  this: ConfettoType,
  x: number,
  y: number,
  vx: number,
  vy: number,
  radius: number,
  colour: string
) {
  this.cx = x;
  this.cy = y;
  this.vx = vx;
  this.vy = vy;
  this.radius = radius;
  this.colour = colour;
};

export const getRandomColour = () => Math.floor(Math.random() * 256).toString();

export const getRandomNumber = (size: number) =>
  Math.floor(Math.random() * size);

export const getRandomSpeed = (size: number) => {
  const onePercent = size / 100;
  return (
    (Math.random() < 0.5 ? 1 : -1) *
      Math.floor(Math.random() * onePercent * 2) +
    onePercent
  );
};

export const createConfetto = (width: number, height: number) => {
  const newX = getRandomNumber(width);
  const newY = getRandomNumber(height);
  const newVX = getRandomSpeed(width);
  const newVY = getRandomSpeed(height);
  const newRadius = 5;
  const newColour = `rgb(${getRandomColour()}, ${getRandomColour()}, ${getRandomColour()})`;
  // @ts-ignore
  return new Confetto(newX, newY, newVX, newVY, newRadius, newColour);
};
