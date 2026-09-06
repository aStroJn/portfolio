import gsap from 'gsap';
import type { Sprite } from 'pixi.js';
import type { AnimationOrchestrator } from './AnimationOrchestrator';

export function createBirdFlight(
  orch: AnimationOrchestrator,
  birds: Sprite[],
): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  birds.forEach((bird, i) => {
    tl.to(
      bird,
      {
        x: bird.x + 30,
        y: bird.y - 10,
        duration: 3 + (i % 3),
        ease: 'sine.inOut',
      },
      0,
    );
  });
  return orch.register(tl);
}
