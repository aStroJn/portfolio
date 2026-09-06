export interface TimelineLike {
  pause: () => unknown;
  resume: () => unknown;
  kill: () => unknown;
}

export class AnimationOrchestrator {
  private readonly timelines: TimelineLike[] = [];

  register<T extends TimelineLike>(tl: T): T {
    this.timelines.push(tl);
    return tl;
  }

  pauseAll(): void {
    for (const tl of this.timelines) {
      tl.pause();
    }
  }

  resumeAll(): void {
    for (const tl of this.timelines) {
      tl.resume();
    }
  }

  destroy(): void {
    for (const tl of this.timelines) {
      tl.kill();
    }
    this.timelines.length = 0;
  }
}
