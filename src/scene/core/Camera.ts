import { Container } from 'pixi.js';

export interface CameraState {
  scale: number;
  offsetX: number;
  offsetY: number;
}

export class Camera {
  private baseState: CameraState = { scale: 1, offsetX: 0, offsetY: 0 };
  private scrollProgress = 0;
  private panProgress = 0.5;
  private panProgressY = 0.5;
  private viewportWidth = 1920;
  private viewportHeight = 1080;
  readonly root: Container;
  readonly masterWidth: number;
  readonly masterHeight: number;

  constructor(masterWidth: number, masterHeight: number) {
    this.masterWidth = masterWidth;
    this.masterHeight = masterHeight;
    this.root = new Container();
  }

  resize(viewportWidth: number, viewportHeight: number): void {
    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;

    const scaleX = viewportWidth / this.masterWidth;
    const scaleY = viewportHeight / this.masterHeight;

    let scale: number;
    let offsetX: number;
    let offsetY: number;

    if (viewportWidth < viewportHeight) {
      // Portrait mode (mobile / tablet portrait):
      // Fit horizontally so the entire panorama is fully visible across the screen width.
      // Trimming ~18px from top-starting removes empty sky gap on mobile screens.
      scale = scaleX;
      const scaledHeight = this.masterHeight * scale;
      offsetX = 0;
      offsetY = (viewportHeight - scaledHeight) / 2 - 18;
    } else {
      // Landscape mode (desktop, laptop, ultrawide, mobile landscape):
      // Always cover with overscan so the scene fills edge-to-edge with NO black bars / letterboxing.
      // On mobile landscape / short viewports (height <= 600), use 15% overscan for panoramic pan room.
      // On desktop, use standard 5% overscan.
      const overscan = (viewportHeight <= 600 && this.masterHeight === 1080) ? 1.15 : 1.05;
      scale = Math.max(scaleX, scaleY) * overscan;
      const scaledWidth = this.masterWidth * scale;
      const scaledHeight = this.masterHeight * scale;
      const maxOverflowX = Math.max(0, scaledWidth - viewportWidth);
      const maxOverflowY = Math.max(0, scaledHeight - viewportHeight);

      offsetX = -maxOverflowX * this.panProgress;

      // Vertical framing:
      // On standard desktop screens (height > 600), anchor to the bottom so ground is grounded.
      // On mobile landscape / short viewports (height <= 600), anchor adaptively (anchorY = 0.58)
      // and trim ~18px from top-starting so bench and ground have ample room!
      if (viewportHeight <= 600 && this.masterHeight === 1080) {
        offsetY = -maxOverflowY * 0.58 - 18;
      } else {
        offsetY = viewportHeight - scaledHeight;
      }
    }

    this.baseState = { scale, offsetX, offsetY };
    this.applyTransform();
  }

  setPanProgress(panX: number, panY: number = 0.5): void {
    this.panProgress = Math.max(0, Math.min(1, panX));
    this.panProgressY = Math.max(0, Math.min(1, panY));
    this.applyTransform();
  }

  getPanProgress(): number {
    return this.panProgress;
  }

  getPanProgressY(): number {
    return this.panProgressY;
  }

  setScrollProgress(progress: number): void {
    this.scrollProgress = progress;
    this.applyTransform();
  }

  private applyTransform(): void {
    const { scale } = this.baseState;
    const zoom = scale * (1 + this.scrollProgress * 0.08);
    const scaledWidth = this.masterWidth * zoom;
    const scaledHeight = this.masterHeight * zoom;

    if (this.viewportWidth < this.viewportHeight) {
      // In portrait: allow camera to pan horizontally with device tilt / gyro!
      const tiltShiftRange = this.viewportWidth * 0.35;
      const tiltShiftX = (0.5 - this.panProgress) * tiltShiftRange;
      const maxOverflowX = Math.max(0, scaledWidth - this.viewportWidth);
      this.root.x = -maxOverflowX * this.panProgress + tiltShiftX;
      const scrollShiftY = -this.scrollProgress * this.masterHeight * 0.15 * zoom;
      this.root.y = (this.viewportHeight - scaledHeight) / 2 + scrollShiftY - 18;
      this.root.scale.set(zoom);
    } else {
      // Landscape mode (desktop & mobile landscape):
      const maxOverflowX = Math.max(0, scaledWidth - this.viewportWidth);
      const maxOverflowY = Math.max(0, scaledHeight - this.viewportHeight);
      this.root.x = -maxOverflowX * this.panProgress;

      let baseY: number;
      if (this.viewportHeight <= 600 && this.masterHeight === 1080) {
        baseY = -maxOverflowY * 0.58 - 18;
      } else {
        baseY = this.viewportHeight - scaledHeight;
      }

      if (maxOverflowY > 0) {
        // Dynamic pitch rotation around screen X-axis (clearly observable travel: up to ±55px)
        const verticalTiltRange = Math.min(maxOverflowY * 0.40, 55);
        const tiltOffsetY = (0.5 - this.panProgressY) * verticalTiltRange * 2;
        baseY = Math.min(0, Math.max(this.viewportHeight - scaledHeight, baseY + tiltOffsetY));
      }

      const scrollShiftY = -this.scrollProgress * this.masterHeight * 0.15 * zoom;
      this.root.y = baseY + scrollShiftY;
      this.root.scale.set(zoom);
    }
  }

  getState(): CameraState {
    return {
      scale: this.root.scale.x,
      offsetX: this.root.x,
      offsetY: this.root.y,
    };
  }

  getBaseState(): CameraState {
    return this.baseState;
  }
}
