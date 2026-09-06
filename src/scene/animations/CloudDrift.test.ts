import { describe, it, expect, vi } from 'vitest';

vi.mock('gsap', () => {
  const tl = {
    to: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    add: vi.fn().mockReturnThis(),
  };
  return {
    default: { timeline: () => tl },
    gsap: { timeline: () => tl },
  };
});

import { createCloudDrift } from './CloudDrift';
import type { AnimationOrchestrator } from './AnimationOrchestrator';

describe('createCloudDrift', () => {
  it('registers a timeline with the orchestrator', () => {
    const orch = { register: vi.fn().mockReturnValue({}) } as unknown as AnimationOrchestrator;
    const clouds = [{ x: 0 } as never];
    createCloudDrift(orch, clouds, { speedPxPerSec: 35 });
    expect(orch.register).toHaveBeenCalled();
  });
});
