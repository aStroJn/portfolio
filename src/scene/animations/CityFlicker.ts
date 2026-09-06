import { gsap } from 'gsap';
import type { Sprite } from 'pixi.js';
import type { AnimationOrchestrator } from './AnimationOrchestrator';

export function createCityFlicker(
  orch: AnimationOrchestrator,
  city: Sprite,
): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1 });
  tl.to(city, { alpha: 0.95, duration: 0.1, repeat: 30, yoyo: true });
  return orch.register(tl);
}
