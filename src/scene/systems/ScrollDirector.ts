import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Camera } from '../core/Camera';
import { useScrollStore } from '../../state/scroll';

if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  gsap.registerPlugin(ScrollTrigger);
}

export class ScrollDirector {
  private lenis: Lenis | null = null;
  private trigger: ScrollTrigger | null = null;

  constructor(
    private readonly camera: Camera,
    private readonly target: HTMLElement | Window = typeof window !== 'undefined' ? window : ({} as Window),
  ) {}

  start(): void {
    if (typeof window === 'undefined') return;

    const reducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    this.lenis = new Lenis();
    gsap.ticker.add((time) => this.lenis?.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    this.trigger = ScrollTrigger.create({
      trigger: this.target === window ? document.body : (this.target as Element),
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const s = self.progress;
        this.camera.setScrollProgress(s);
        useScrollStore.getState().setScrollProgress(s);
        const camState = this.camera.getState();
        useScrollStore.getState().setCameraState({
          x: camState.offsetX,
          y: camState.offsetY,
          zoom: camState.scale,
        });
      },
    });
  }

  destroy(): void {
    this.lenis?.destroy();
    this.lenis = null;
    this.trigger?.kill();
    this.trigger = null;
    if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.getAll) {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    }
  }
}
