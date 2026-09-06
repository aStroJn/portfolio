import { describe, it, expect } from 'vitest';
import { ParallaxSystem, ZERO_PARALLAX } from './ParallaxSystem';

const makeSprite = (x: number, y: number) =>
  ({ x, y } as unknown as import('pixi.js').Sprite);

describe('ParallaxSystem', () => {
  it('does not move sprites at zero input', () => {
    const sys = new ParallaxSystem();
    const s = makeSprite(100, 200);
    sys.track('city', s);
    sys.update(ZERO_PARALLAX);
    expect(s.x).toBe(100);
    expect(s.y).toBe(200);
  });

  it('moves depth-aware sprites based on depth at input = 1', () => {
    const sys = new ParallaxSystem();
    const s1 = makeSprite(0, 0);
    sys.track('sky', s1); // depth 0
    sys.update({ x: 1, y: 1 });
    expect(s1.x).toBe(0);
    expect(s1.y).toBe(0);

    const s2 = makeSprite(0, 0);
    sys.track('midTrees', s2); // depth 1.0
    sys.update({ x: 1, y: 1 });
    expect(s2.x).toBe(-18);
    expect(s2.y).toBe(-10);
  });

  it('respects reduced-motion by passing ZERO_PARALLAX', () => {
    const sys = new ParallaxSystem();
    const s = makeSprite(100, 200);
    sys.track('sky', s);
    sys.update(ZERO_PARALLAX);
    expect(s.x).toBe(100);
  });
});
