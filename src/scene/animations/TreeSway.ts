import { gsap } from 'gsap';
import type { Sprite } from 'pixi.js';
import type { AnimationOrchestrator } from './AnimationOrchestrator';

export function createTreeSway(
  orch: AnimationOrchestrator,
  trees: Sprite[],
): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  trees.forEach((tree, i) => {
    const pivotX = tree.x;
    tl.to(
      tree,
      {
        x: pivotX + 2,
        duration: 4 + (i % 3),
        ease: 'sine.inOut',
      },
      0,
    );
  });
  return orch.register(tl);
}
