import { describe, it, expect, vi } from 'vitest';
import { AnimationOrchestrator, type TimelineLike } from './AnimationOrchestrator';

describe('AnimationOrchestrator', () => {
  it('register, pauseAll, resumeAll, destroy all work', () => {
    const orch = new AnimationOrchestrator();
    const mockTimeline: TimelineLike = {
      pause: vi.fn(),
      resume: vi.fn(),
      kill: vi.fn(),
    };
    const tl = orch.register(mockTimeline);
    orch.pauseAll();
    expect(tl.pause).toHaveBeenCalled();
    orch.resumeAll();
    expect(tl.resume).toHaveBeenCalled();
    orch.destroy();
    expect(tl.kill).toHaveBeenCalled();
  });
});
