import { describe, it, vi } from 'vitest';

vi.mock('lenis', () => ({
  default: class {
    raf = vi.fn();
    destroy = vi.fn();
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn().mockReturnValue({ kill: vi.fn() }),
    getAll: () => [{ kill: vi.fn() }],
  },
}));

import { ScrollDirector } from './ScrollDirector';
import { Camera } from '../core/Camera';

describe('ScrollDirector', () => {
  it('starts and destroys cleanly', () => {
    const cam = new Camera(1000, 500);
    const dir = new ScrollDirector(cam, window);
    dir.start();
    dir.destroy();
  });
});
