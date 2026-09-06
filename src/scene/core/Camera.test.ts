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

  it('fits width and centers vertically on portrait viewports', () => {
    const cam = new Camera(1920, 1080);
    cam.resize(390, 844);
    const s = cam.getState();
    expect(s.scale).toBeCloseTo(390 / 1920);
    expect(s.offsetX).toBeCloseTo(0);
    expect(s.offsetY).toBeCloseTo((844 - 1080 * (390 / 1920)) / 2 - 18);
  });

  it('covers full width and height with adaptive vertical framing on mobile landscape viewports', () => {
    const cam = new Camera(1920, 1080);
    cam.resize(1024, 350);
    const s = cam.getState();
    const expectedScale = (1024 / 1920) * 1.15;
    expect(s.scale).toBeCloseTo(expectedScale);
    // Fully covers width with zero black bars
    expect(1920 * s.scale).toBeGreaterThanOrEqual(1024);
    // Fully covers height with zero black bars
    expect(1080 * s.scale).toBeGreaterThanOrEqual(350);
    // Verified adaptive vertical framing keeps both skyline/sun and bench visible
    const maxOverflowY = 1080 * expectedScale - 350;
    expect(s.offsetY).toBeCloseTo(-maxOverflowY * 0.58 - 18);

    // Dynamic tilt updates vertical pan offset with clearly observable travel (>40px)
    cam.setPanProgress(0.5, 0); // Tilted up (look towards sky)
    expect(cam.getState().offsetY - s.offsetY).toBeGreaterThanOrEqual(40);
    cam.setPanProgress(0.5, 1); // Tilted down (look towards ground below bench)
    expect(s.offsetY - cam.getState().offsetY).toBeGreaterThanOrEqual(40);
  });
});

