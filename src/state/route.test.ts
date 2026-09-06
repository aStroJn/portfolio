import { describe, it, expect, beforeEach } from 'vitest';
import { useRouteStore } from './route';

describe('useRouteStore', () => {
  beforeEach(() => {
    useRouteStore.setState({ activeRoute: null });
  });

  it('starts with activeRoute = null', () => {
    expect(useRouteStore.getState().activeRoute).toBeNull();
  });

  it('setActiveRoute updates activeRoute', () => {
    useRouteStore.getState().setActiveRoute('projects');
    expect(useRouteStore.getState().activeRoute).toBe('projects');
  });
});