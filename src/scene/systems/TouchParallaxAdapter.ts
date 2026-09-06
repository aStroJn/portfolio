import type { ParallaxInput } from './ParallaxSystem';

export class TouchParallaxAdapter {
  private x = 0;
  private y = 0;
  private targetX = 0;
  private targetY = 0;
  private isTouching = false;
  private panProgress = 0.5;
  private panVelocity = 0;
  private lastTouchX = 0;
  private startTouchX = 0;
  private startTouchY = 0;
  private isHorizontalSwipe = false;

  constructor(private readonly target: Window = window) {
    if (typeof this.target !== 'undefined' && this.target.addEventListener) {
      this.target.addEventListener('touchstart', this.onTouchStart, { passive: true });
      this.target.addEventListener('touchmove', this.onTouchMove, { passive: true });
      this.target.addEventListener('touchend', this.onTouchEnd, { passive: true });
      this.target.addEventListener('touchcancel', this.onTouchEnd, { passive: true });
    }
  }

  private onTouchStart = (e: TouchEvent) => {
    this.isTouching = true;
    this.panVelocity = 0;
    this.isHorizontalSwipe = false;
    const t = e.touches[0];
    if (t) {
      this.lastTouchX = t.clientX;
      this.startTouchX = t.clientX;
      this.startTouchY = t.clientY;
    }
    this.updateFromTouch(e);
  };

  private onTouchMove = (e: TouchEvent) => {
    this.isTouching = true;
    const t = e.touches[0];
    if (t) {
      const dx = Math.abs(t.clientX - this.startTouchX);
      const dy = Math.abs(t.clientY - this.startTouchY);

      if (!this.isHorizontalSwipe && dx > dy && dx > 8) {
        this.isHorizontalSwipe = true;
      }

      if (this.isHorizontalSwipe) {
        const deltaX = t.clientX - this.lastTouchX;
        const w = (this.target && this.target.innerWidth) || 1;
        const deltaPan = -deltaX / (w * 1.2);
        this.panProgress = Math.max(0, Math.min(1, this.panProgress + deltaPan));
        this.panVelocity = deltaPan;
      }
      this.lastTouchX = t.clientX;
    }
    this.updateFromTouch(e);
  };

  private onTouchEnd = () => {
    this.isTouching = false;
    this.isHorizontalSwipe = false;
    this.targetX = 0;
    this.targetY = 0;
  };

  getPanProgress(): number {
    if (!this.isTouching && Math.abs(this.panVelocity) > 0.0001) {
      this.panProgress = Math.max(0, Math.min(1, this.panProgress + this.panVelocity));
      this.panVelocity *= 0.90;
    }
    return this.panProgress;
  }

  setPanProgress(val: number): void {
    this.panProgress = Math.max(0, Math.min(1, val));
    this.panVelocity = 0;
  }

  private updateFromTouch(e: TouchEvent): void {
    const t = e.touches[0];
    if (!t) return;
    const w = (this.target && this.target.innerWidth) || 1;
    const h = (this.target && this.target.innerHeight) || 1;
    this.targetX = Math.max(-1, Math.min(1, (t.clientX / w) * 2 - 1));
    this.targetY = Math.max(-1, Math.min(1, (t.clientY / h) * 2 - 1));
  }

  getInput(): ParallaxInput {
    // Smooth lerp towards target when touching, smooth decay back to 0 on release
    const smoothing = this.isTouching ? 0.2 : 0.08;
    this.x += (this.targetX - this.x) * smoothing;
    this.y += (this.targetY - this.y) * smoothing;
    // Snap to 0 when near zero
    if (!this.isTouching && Math.abs(this.x) < 0.001) this.x = 0;
    if (!this.isTouching && Math.abs(this.y) < 0.001) this.y = 0;
    return { x: this.x, y: this.y };
  }

  destroy(): void {
    if (typeof this.target !== 'undefined' && this.target.removeEventListener) {
      this.target.removeEventListener('touchstart', this.onTouchStart);
      this.target.removeEventListener('touchmove', this.onTouchMove);
      this.target.removeEventListener('touchend', this.onTouchEnd);
      this.target.removeEventListener('touchcancel', this.onTouchEnd);
    }
  }
}
