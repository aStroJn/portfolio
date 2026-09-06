import { describe, it, expect, vi } from 'vitest';

vi.mock('pixi.js', async () => {
  const actual = await vi.importActual<typeof import('pixi.js')>('pixi.js');
  return {
    ...actual,
    AnimatedSprite: class {
      animationSpeed = 0;
      textures: unknown[] = [];
      gotoAndPlay = vi.fn();
    },
    Assets: {
      load: vi.fn().mockResolvedValue({ frames: [] }),
    },
  };
});

import { Character } from './CharacterFactory';

describe('Character.fromSpriteSheet', () => {
  it('returns a Character class function', async () => {
    expect(Character.fromSpriteSheet).toBeTypeOf('function');
  });
});
