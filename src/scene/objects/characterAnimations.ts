import gsap from 'gsap';
import type { Character } from './CharacterFactory';
import type { AnimationOrchestrator } from '../animations/AnimationOrchestrator';

export function attachIdleAnimations(
  orch: AnimationOrchestrator,
  character: Character,
): gsap.core.Timeline {
  const sprite = character.sprite;
  const origScaleY = sprite.scale.y;

  const tl = gsap.timeline({ repeat: -1 });
  // Breathing: subtle vertical scale
  tl.to(sprite.scale, {
    y: origScaleY * 1.02,
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  });

  return orch.register(tl);
}
