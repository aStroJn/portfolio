import type { ParallaxInput } from './ParallaxSystem';

export class GyroscopeParallaxAdapter {
  private x = 0;
  private y = 0;
  private targetX = 0;
  private targetY = 0;

  constructor(private readonly target: Window = window) {
    if (typeof this.target !== 'undefined' && this.target.addEventListener) {
      this.target.addEventListener('deviceorientation', this.onOrient);
    }
  }

  private onOrient = (e: DeviceOrientationEvent) => {
    // gamma: left/right tilt [-90, 90]; beta: front/back tilt [-180, 180]
    const g = e.gamma ?? 0;
    const b = e.beta ?? 0;
    this.targetX = Math.max(-1, Math.min(1, g / 35));
    this.targetY = Math.max(-1, Math.min(1, (b - 45) / 35));
  };

  getInput(): ParallaxInput {
    // Low-pass filter smoothing for stable sensor reading
    this.x += (this.targetX - this.x) * 0.12;
    this.y += (this.targetY - this.y) * 0.12;
    return { x: this.x, y: this.y };
  }

  destroy(): void {
    if (typeof this.target !== 'undefined' && this.target.removeEventListener) {
      this.target.removeEventListener('deviceorientation', this.onOrient);
    }
  }
}
