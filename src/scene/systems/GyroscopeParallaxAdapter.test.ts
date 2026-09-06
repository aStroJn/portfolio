import { describe, it, expect, vi } from 'vitest';
import { GyroscopeParallaxAdapter } from './GyroscopeParallaxAdapter';

describe('GyroscopeParallaxAdapter', () => {
  it('initializes with default zero input and neutral 0.5 panProgress', () => {
    const fakeWindow = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as Window;

    const adapter = new GyroscopeParallaxAdapter(fakeWindow);
    expect(adapter.getInput()).toEqual({ x: 0, y: 0 });
    expect(adapter.getPanProgress()).toBeCloseTo(0.5);
    adapter.destroy();
  });

  it('responds to portrait deviceorientation events and updates panProgress', () => {
    const listeners: Record<string, (e: unknown) => void> = {};
    const fakeWindow = {
      addEventListener: (type: string, fn: (e: unknown) => void) => {
        listeners[type] = fn;
      },
      removeEventListener: vi.fn(),
    } as unknown as Window;

    const adapter = new GyroscopeParallaxAdapter(fakeWindow);
    expect(listeners['deviceorientation']).toBeDefined();

    // Tilt right in portrait: gamma = 30
    listeners['deviceorientation']({ gamma: 30, beta: 45 });
    // Advance low-pass filter
    for (let i = 0; i < 20; i++) {
      adapter.getInput();
    }

    const input = adapter.getInput();
    expect(input.x).toBeGreaterThan(0.5);
    expect(adapter.getPanProgress()).toBeGreaterThan(0.7);

    adapter.destroy();
  });

  it('cleans up event listeners on destroy', () => {
    const removeEventListener = vi.fn();
    const fakeWindow = {
      addEventListener: vi.fn(),
      removeEventListener,
    } as unknown as Window;

    const adapter = new GyroscopeParallaxAdapter(fakeWindow);
    adapter.destroy();
    expect(removeEventListener).toHaveBeenCalledWith('deviceorientation', expect.any(Function));
  });
});
