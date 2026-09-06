import { gsap } from 'gsap';
import type { Sprite, Texture } from 'pixi.js';
import type { AnimationOrchestrator } from './AnimationOrchestrator';

/**
 * Creates a frame-cycling animation for a screen sprite (e.g. CRT computer terminals).
 * Cycles through the provided textures with a specified interval.
 */
export function createScreenAnimation(
  orch: AnimationOrchestrator,
  screenSprite: Sprite,
  frames: readonly Texture[],
  intervalSec = 0.6,
): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1 });

  if (frames.length > 1) {
    // 1 -> 2 -> 3 -> 2 -> 1 ping-pong loop
    const sequence = [...frames, ...frames.slice(1, -1).reverse()];

    sequence.forEach((frame, index) => {
      tl.call(
        () => {
          screenSprite.texture = frame;
        },
        undefined,
        index * intervalSec,
      );
    });

    // Set timeline duration to exactly sequence.length * intervalSec with zero trailing pause
    tl.to({}, { duration: 0 }, sequence.length * intervalSec);
  }

  return orch.register(tl);
}
