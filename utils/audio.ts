export const booms = [new Audio("assets/big-boom.mp3")];
export const bursts = [new Audio("assets/burst.mp3")];
export const wooshes = [new Audio("assets/woosh.mp3")];

export const randomInt = (a: number, b: number) =>
  Math.floor(Math.random() * (b - a + 1)) + a;

export const boom = () => booms[randomInt(0, booms.length - 1)].play();
export const burst = () => bursts[randomInt(0, booms.length - 1)].play();
export const woosh = () => wooshes[randomInt(0, booms.length - 1)].play();
