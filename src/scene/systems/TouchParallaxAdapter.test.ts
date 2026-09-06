import { describe, it, expect, vi } from 'vitest';
import { TouchParallaxAdapter } from './TouchParallaxAdapter';

describe('TouchParallaxAdapter', () => {
  it('returns zero input before any touch', () => {
    const target = {
      innerWidth: 1000,
      innerHeight: 1000,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as Window;
    const a = new TouchParallaxAdapter(target);
    expect(a.getInput()).toEqual({ x: 0, y: 0 });
    a.destroy();
  });

  it('updates input on touchmove and decays on touchend', () => {
    const listeners: Record<string, (e: unknown) => void> = {};
    const target = {
      innerWidth: 1000,
      innerHeight: 1000,
      addEventListener: (type: string, fn: (e: unknown) => void) => {
        listeners[type] = fn;
      },
      removeEventListener: vi.fn(),
    } as unknown as Window;

    const a = new TouchParallaxAdapter(target);

    // Simulate touchstart at center (500, 500) -> target (0, 0)
    listeners['touchstart']?.({ touches: [{ clientX: 500, clientY: 500 }] });
    // Simulate touchmove to right/bottom (1000, 1000) -> target (1, 1)
    listeners['touchmove']?.({ touches: [{ clientX: 1000, clientY: 1000 }] });

    const inputAfterTouch = a.getInput();
    expect(inputAfterTouch.x).toBeGreaterThan(0);
    expect(inputAfterTouch.y).toBeGreaterThan(0);

    // Simulate touchend
    listeners['touchend']?.({});
    // After touchend, values should decay
    a.getInput();
    a.destroy();
  });
});
