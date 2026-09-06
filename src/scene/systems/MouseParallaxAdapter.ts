import type { ParallaxInput } from './ParallaxSystem';

export class MouseParallaxAdapter {
  private x = 0;
  private y = 0;

  constructor(private readonly target: Window = window) {
    if (typeof this.target !== 'undefined' && this.target.addEventListener) {
      this.target.addEventListener('mousemove', this.onMove);
    }
  }

  private onMove = (e: MouseEvent) => {
    const w = (this.target && this.target.innerWidth) || 1;
    const h = (this.target && this.target.innerHeight) || 1;
    this.x = (e.clientX / w) * 2 - 1; // [-1, 1]
    this.y = (e.clientY / h) * 2 - 1;
  };

  getInput(): ParallaxInput {
    return { x: this.x, y: this.y };
  }

  destroy(): void {
    if (typeof this.target !== 'undefined' && this.target.removeEventListener) {
      this.target.removeEventListener('mousemove', this.onMove);
    }
  }
}
