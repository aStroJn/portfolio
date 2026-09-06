import { describe, it, expect } from 'vitest';
import { createScreenAnimation } from './ScreenAnimation';
import { AnimationOrchestrator } from './AnimationOrchestrator';
import type { Sprite, Texture } from 'pixi.js';

describe('ScreenAnimation', () => {
  it('registers a looping timeline with the orchestrator', () => {
    const orch = new AnimationOrchestrator();
    const fakeSprite = { texture: {} as Texture } as Sprite;
    const fakeTextures = [{} as Texture, {} as Texture, {} as Texture];

    const tl = createScreenAnimation(orch, fakeSprite, fakeTextures, 0.5);
    expect(tl).toBeDefined();
    expect(tl.repeat()).toBe(-1);
    orch.destroy();
  });
});
