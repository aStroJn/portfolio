import type { ParallaxInput } from './ParallaxSystem';

export class GyroscopeParallaxAdapter {
  private x = 0;
  private y = 0;
  private targetX = 0;
  private targetY = 0;

  private hasReceivedOrientation = false;
  private baselineY: number | null = null;

  constructor(private readonly target: Window = window) {
    if (typeof this.target !== 'undefined' && this.target.addEventListener) {
      // Always register orientation and motion listeners directly
      this.target.addEventListener('deviceorientation', this.onOrient);
      this.target.addEventListener('deviceorientationabsolute', this.onOrient as EventListener);
      this.target.addEventListener('devicemotion', this.onMotion as EventListener);

      const DeviceOrientation = (typeof DeviceOrientationEvent !== 'undefined'
        ? DeviceOrientationEvent
        : undefined) as unknown as {
        requestPermission?: () => Promise<'granted' | 'denied'>;
      };

      if (DeviceOrientation && typeof DeviceOrientation.requestPermission === 'function') {
        this.target.addEventListener('click', this.requestPermissionOnInteraction, { once: true });
        this.target.addEventListener('touchend', this.requestPermissionOnInteraction, { once: true });
        this.target.addEventListener('pointerdown', this.requestPermissionOnInteraction, { once: true });
      }
    }
  }

  public requestPermission = async (): Promise<boolean> => {
    const DeviceOrientation = (typeof DeviceOrientationEvent !== 'undefined'
      ? DeviceOrientationEvent
      : undefined) as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };

    if (DeviceOrientation && typeof DeviceOrientation.requestPermission === 'function') {
      try {
        const res = await DeviceOrientation.requestPermission();
        if (res === 'granted' && typeof this.target !== 'undefined' && this.target.addEventListener) {
          this.target.addEventListener('deviceorientation', this.onOrient);
          this.target.addEventListener('devicemotion', this.onMotion as EventListener);
          return true;
        }
      } catch {
        // Permission declined
      }
      return false;
    }
    return true;
  };

  private requestPermissionOnInteraction = () => {
    this.requestPermission();
  };

  private onOrient = (e: DeviceOrientationEvent) => {
    if (e.gamma === null || e.beta === null) return;
    this.hasReceivedOrientation = true;

    const g = e.gamma;
    const b = e.beta;

    // Detect screen orientation (portrait vs landscape) to map physical tilt to screen axes correctly
    const angle =
      typeof window !== 'undefined'
        ? window.screen?.orientation?.angle ??
          (typeof (window as unknown as { orientation?: number }).orientation === 'number'
            ? (window as unknown as { orientation?: number }).orientation!
            : 0)
        : 0;

    let rawTiltX = 0;
    let rawTiltY = 0;

    if (angle === 90) {
      // Landscape primary (top-left)
      rawTiltX = -b;
      rawTiltY = g;
    } else if (angle === 270 || angle === -90) {
      // Landscape secondary (top-right)
      rawTiltX = b;
      rawTiltY = -g;
    } else if (angle === 180) {
      // Portrait upside-down
      rawTiltX = -g;
      rawTiltY = -(b - 45);
    } else {
      // Portrait regular (held at ~45° reading angle)
      rawTiltX = g;
      rawTiltY = b - 45;
    }

    // Adaptive resting baseline for vertical pitch (rotation around screen X-axis)
    // Ensures resting hand angle is always centered (0) and vertical tilt is immediately responsive
    if (this.baselineY === null) {
      this.baselineY = rawTiltY;
    } else {
      this.baselineY += (rawTiltY - this.baselineY) * 0.005;
    }

    const diffY = rawTiltY - this.baselineY;
    const SENSITIVITY_X = 28;
    const SENSITIVITY_Y = 16; // 16 degrees of tilt produces clear, observable vertical movement

    this.targetX = Math.max(-1, Math.min(1, rawTiltX / SENSITIVITY_X));
    this.targetY = Math.max(-1, Math.min(1, diffY / SENSITIVITY_Y));
  };

  private onMotion = (e: DeviceMotionEvent) => {
    // If deviceorientation already provides data, let it have precedence
    if (this.hasReceivedOrientation) return;

    const acc = e.accelerationIncludingGravity;
    if (!acc || acc.x === null || acc.y === null) return;

    const angle =
      typeof window !== 'undefined'
        ? window.screen?.orientation?.angle ??
          (typeof (window as unknown as { orientation?: number }).orientation === 'number'
            ? (window as unknown as { orientation?: number }).orientation!
            : 0)
        : 0;

    // Gravitational acceleration (m/s^2) normalized for gentle tilt
    const rawX = acc.x / 4.0;
    const rawY = ((acc.y ?? 9.8) - 6.5) / 4.0;

    if (angle === 90) {
      this.targetX = Math.max(-1, Math.min(1, -rawY));
      this.targetY = Math.max(-1, Math.min(1, rawX));
    } else if (angle === 270 || angle === -90) {
      this.targetX = Math.max(-1, Math.min(1, rawY));
      this.targetY = Math.max(-1, Math.min(1, -rawX));
    } else {
      this.targetX = Math.max(-1, Math.min(1, rawX));
      this.targetY = Math.max(-1, Math.min(1, rawY));
    }
  };

  getInput(): ParallaxInput {
    // Responsive low-pass filter smoothing
    this.x += (this.targetX - this.x) * 0.18;
    this.y += (this.targetY - this.y) * 0.18;
    return { x: this.x, y: this.y };
  }

  getPanProgress(): number {
    // Maps horizontal tilt [-1, 1] gently to camera panoramic pan progress [0.20, 0.80]
    // Keeping pan safely within overscan boundaries so side edges are never exposed
    return Math.max(0.20, Math.min(0.80, 0.5 + this.x * 0.25));
  }

  getPanProgressY(): number {
    // Maps vertical pitch [-1, 1] to camera pitch progress [0, 1] for full observable travel
    return Math.max(0, Math.min(1, 0.5 + this.y * 0.5));
  }

  hasSensor(): boolean {
    return this.hasReceivedOrientation;
  }

  destroy(): void {
    if (typeof this.target !== 'undefined' && this.target.removeEventListener) {
      this.target.removeEventListener('deviceorientation', this.onOrient);
      this.target.removeEventListener('deviceorientationabsolute', this.onOrient as EventListener);
      this.target.removeEventListener('devicemotion', this.onMotion as EventListener);
      this.target.removeEventListener('click', this.requestPermissionOnInteraction);
      this.target.removeEventListener('touchend', this.requestPermissionOnInteraction);
      this.target.removeEventListener('pointerdown', this.requestPermissionOnInteraction);
    }
  }
}
