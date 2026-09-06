import { gsap } from 'gsap';
import type { Sprite } from 'pixi.js';
import type { AnimationOrchestrator } from './AnimationOrchestrator';

export function createSunGlow(
  orch: AnimationOrchestrator,
  sun: Sprite,
): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  tl.to(sun, { alpha: 0.9, duration: 4, ease: 'sine.inOut' });
  return orch.register(tl);
}
