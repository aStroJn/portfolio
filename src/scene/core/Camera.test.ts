import { describe, it, expect } from 'vitest';
import { Camera } from './Camera';

describe('Camera', () => {
  it('scales to cover wider viewports with overscan margin', () => {
    const cam = new Camera(1000, 500);
    cam.resize(2000, 500);
    const s = cam.getState();
    expect(s.scale).toBeCloseTo(2.1);
    expect(s.offsetX).toBeCloseTo(-50);
    expect(s.offsetY).toBeCloseTo(-550);
  });

  it('supports horizontal pan progress when content overflows viewport', () => {
    const cam = new Camera(1000, 500);
    cam.resize(2000, 500);
    cam.setPanProgress(0); // Pan to left edge
    expect(cam.getState().offsetX).toBeCloseTo(0);
    cam.setPanProgress(1); // Pan to right edge
    expect(cam.getState().offsetX).toBeCloseTo(-100);
  });

  it('covers full viewport when viewport matches master resolution', () => {
    const cam = new Camera(1920, 1080);
    cam.resize(1920, 1080);
    expect(cam.getState().scale).toBeCloseTo(1.05);
    expect(cam.getState().offsetX).toBeCloseTo(-48);
    expect(cam.getState().offsetY).toBeCloseTo(-54);
  });
});
