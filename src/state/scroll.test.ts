import { describe, it, expect, beforeEach } from 'vitest';
import { useScrollStore } from './scroll';

describe('useScrollStore', () => {
  beforeEach(() => {
    useScrollStore.setState({
      cameraState: { x: 0, y: 0, zoom: 1 },
      activeSection: 'home',
    });
  });

  it('starts with camera at (0, 0, 1) and activeSection = home', () => {
    const s = useScrollStore.getState();
    expect(s.cameraState).toEqual({ x: 0, y: 0, zoom: 1 });
    expect(s.activeSection).toBe('home');
  });

  it('setCameraState updates the camera', () => {
    useScrollStore.getState().setCameraState({ x: 100, y: 50, zoom: 0.8 });
    expect(useScrollStore.getState().cameraState).toEqual({ x: 100, y: 50, zoom: 0.8 });
  });

  it('setActiveSection updates the active section', () => {
    useScrollStore.getState().setActiveSection('projects');
    expect(useScrollStore.getState().activeSection).toBe('projects');
  });
});
