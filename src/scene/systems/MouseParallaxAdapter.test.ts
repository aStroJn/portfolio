import { describe, it, expect, vi } from 'vitest';
import { MouseParallaxAdapter } from './MouseParallaxAdapter';

describe('MouseParallaxAdapter', () => {
  it('returns zero input initially', () => {
    const target = {
      innerWidth: 1000,
      innerHeight: 1000,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as Window;
    const a = new MouseParallaxAdapter(target);
    expect(a.getInput()).toEqual({ x: 0, y: 0 });
    a.destroy();
  });
});
