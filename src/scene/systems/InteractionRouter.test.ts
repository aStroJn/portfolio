import { describe, it, expect, beforeEach } from 'vitest';
import { InteractionRouter } from './InteractionRouter';
import { useRouteStore } from '../../state/route';

describe('InteractionRouter', () => {
  beforeEach(() => useRouteStore.setState({ activeRoute: null }));

  it('dispatch writes the link route to the route store', () => {
    const router = new InteractionRouter();
    router.dispatch({ label: 'Projects', route: 'projects', relX: 0.5, relY: 0.5 });
    expect(useRouteStore.getState().activeRoute).toBe('projects');
  });
});
