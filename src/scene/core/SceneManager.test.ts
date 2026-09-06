import { describe, it, expect, vi } from 'vitest';

if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

if (typeof window !== 'undefined' && !window.ResizeObserver) {
  (window as unknown as { ResizeObserver: unknown }).ResizeObserver = class {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  };
}

const initMock = vi.fn().mockResolvedValue(undefined);
const destroyMock = vi.fn();
const tickerAddMock = vi.fn();

vi.mock('pixi.js', async () => {
  const actual = await vi.importActual<typeof import('pixi.js')>('pixi.js');
  return {
    ...actual,
    Assets: {
      load: vi.fn().mockResolvedValue({}),
    },
    Application: class {
      init = initMock;
      destroy = destroyMock;
      canvas = document.createElement('canvas');
      stage = { addChild: vi.fn() };
      renderer = { width: 1920, height: 1080, resize: vi.fn() };
      ticker = { add: tickerAddMock };
    },
  };
});

vi.mock('../systems/ScrollDirector', () => ({
  ScrollDirector: class {
    start = vi.fn();
    destroy = vi.fn();
  },
}));

import { SceneManager } from './SceneManager';
import { Camera } from './Camera';
import { AnimationOrchestrator } from '../animations/AnimationOrchestrator';

describe('SceneManager', () => {
  it('mount() initializes PixiJS and creates Camera & Orchestrator', async () => {
    const m = new SceneManager();
    const parent = document.createElement('div');
    await m.mount(parent);
    expect(initMock).toHaveBeenCalled();
    expect((m as unknown as { camera: Camera }).camera).toBeInstanceOf(Camera);
    expect((m as unknown as { orchestrator: AnimationOrchestrator }).orchestrator).toBeInstanceOf(AnimationOrchestrator);
    m.destroy();
  });

  it('destroy() calls app.destroy', async () => {
    const m = new SceneManager();
    const parent = document.createElement('div');
    await m.mount(parent);
    m.destroy();
    expect(destroyMock).toHaveBeenCalled();
  });

  it('does not create input adapters when prefers-reduced-motion is on', async () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener: () => {} }));
    const m = new SceneManager();
    const parent = document.createElement('div');
    await m.mount(parent);
    expect((m as unknown as { mouseAdapter: unknown }).mouseAdapter).toBeNull();
    m.destroy();
    vi.unstubAllGlobals();
  });
});
