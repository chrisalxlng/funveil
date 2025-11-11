import canvasConfetti, { type Options } from "canvas-confetti";

const COUNT = 200;
const DEFAULTS = {
  origin: { y: 0.7 }
};

const fire = (particleRatio: number, options: Options) => {
  canvasConfetti({
    ...DEFAULTS,
    ...options,
    particleCount: Math.floor(COUNT * particleRatio)
  });
};

export const confetti = () => {
  fire(0.25, {
    spread: 26,
    startVelocity: 55
  });
  fire(0.2, {
    spread: 60
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45
  });
};
