import type { ParallaxInput } from './ParallaxSystem';

/**
 * Maps vertical scroll position to a y input. Horizontal is always 0.
 * The y value represents progress through the final 30% of the Hero section.
 * 0 = parallax has not started (before 70% of Hero)
 * 1 = Hero has been completely exited
 */
export class ScrollParallaxAdapter {
  private y = 0;
  private readonly PARALLAX_START = 0.30; // Final 30% of Hero

  constructor(private readonly target: Window = window) {
    if (typeof this.target !== 'undefined' && this.target.addEventListener) {
      this.target.addEventListener('scroll', this.onScroll, { passive: true });
    }
  }

  private onScroll = () => {
    if (typeof document === 'undefined') {
      this.y = 0;
      return;
    }

    const hero = document.querySelector('[data-parallax-hero]') as HTMLElement | null;

    if (!hero) {
      this.y = 0;
      return;
    }

    const scrollY = (this.target && this.target.scrollY) || 0;

    const heroTop = hero.getBoundingClientRect().top + scrollY;
    const heroHeight = hero.offsetHeight;
    const heroBottom = heroTop + heroHeight;

    const parallaxStart = heroBottom - heroHeight * this.PARALLAX_START;

    const progress = (scrollY - parallaxStart) / (heroBottom - parallaxStart);

    this.y = Math.max(0, Math.min(1, progress));
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
