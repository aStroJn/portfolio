import { gsap } from 'gsap';
import type { Sprite } from 'pixi.js';
import type { AnimationOrchestrator } from './AnimationOrchestrator';

export function createFlowerSway(
  orch: AnimationOrchestrator,
  flowers: Sprite[],
): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  flowers.forEach((flower, i) => {
    const pivotY = flower.y;
    tl.to(
      flower,
      { y: pivotY + 1, duration: 2 + (i % 2), ease: 'sine.inOut' },
      0,
    );
  });
  return orch.register(tl);
}
