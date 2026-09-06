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
    // Cover scale with 5% overscan margin so parallax deflection never exposes canvas edges and tree tops are never cut
    const scale = Math.max(scaleX, scaleY) * 1.05;

    const scaledWidth = this.masterWidth * scale;
    const scaledHeight = this.masterHeight * scale;

    const maxOverflowX = Math.max(0, scaledWidth - viewportWidth);
    const offsetX = -maxOverflowX * this.panProgress;
    // Anchor to bottom
    const offsetY = viewportHeight - scaledHeight;

    this.baseState = { scale, offsetX, offsetY };
    this.applyTransform();
  }

  setPanProgress(pan: number): void {
    this.panProgress = Math.max(0, Math.min(1, pan));
    this.applyTransform();
  }

  getPanProgress(): number {
    return this.panProgress;
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

    const maxOverflowX = Math.max(0, scaledWidth - this.viewportWidth);
    this.root.x = -maxOverflowX * this.panProgress;
    const scrollShiftY = -this.scrollProgress * this.masterHeight * 0.15 * zoom;
    this.root.y = (this.viewportHeight - scaledHeight) + scrollShiftY;
    this.root.scale.set(zoom);
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
