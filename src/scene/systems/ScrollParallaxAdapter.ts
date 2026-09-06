import type { ParallaxInput } from './ParallaxSystem';

/**
 * Maps vertical scroll position to a y input. Horizontal is always 0.
 */
export class ScrollParallaxAdapter {
  private y = 0;

  constructor(private readonly target: Window = window) {
    if (typeof this.target !== 'undefined' && this.target.addEventListener) {
      this.target.addEventListener('scroll', this.onScroll, { passive: true });
    }
  }

  private onScroll = () => {
    if (typeof document === 'undefined') return;
    const scrollHeight = document.documentElement ? document.documentElement.scrollHeight : 1;
    const innerHeight = (this.target && this.target.innerHeight) || 1;
    const scrollY = (this.target && this.target.scrollY) || 0;
    const max = Math.max(1, scrollHeight - innerHeight);
    this.y = scrollY / max; // [0, 1]
  };

  getInput(): ParallaxInput {
    return { x: 0, y: this.y };
  }

  destroy(): void {
    if (typeof this.target !== 'undefined' && this.target.removeEventListener) {
      this.target.removeEventListener('scroll', this.onScroll);
    }
  }
}
