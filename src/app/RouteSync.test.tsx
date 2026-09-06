import { describe, it, expect, vi } from 'vitest';

vi.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/projects' }),
  useNavigate: () => vi.fn(),
}));

import { render } from '@testing-library/react';
import { RouteSync } from './RouteSync';
import { useRouteStore } from '../state/route';

describe('RouteSync', () => {
  it('writes the URL pathname to the route store', () => {
    useRouteStore.setState({ activeRoute: null });
    render(<RouteSync />);
    expect(useRouteStore.getState().activeRoute).toBe('projects');
  });
});
