import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SignboardOverlay } from './SignboardOverlay';
import { useRouteStore } from '../../state/route';
import { useSignboardStore } from '../../state/signboard';

describe('SignboardOverlay', () => {
  it('renders null when position is not yet initialized', () => {
    useSignboardStore.setState({ position: null });
    const { container } = render(
      <SignboardOverlay signboard={{ id: 'signRight', items: [] }} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders header and clicking a link dispatches the route', () => {
    useRouteStore.setState({ activeRoute: null });
    useSignboardStore.setState({ position: { x: 100, y: 100, scale: 1 } });
    render(
      <SignboardOverlay
        signboard={{
          id: 'signRight',
          items: [
            { label: 'NAVIGATIONS', relX: 10.38, relY: 0.27, isHeader: true },
            { label: 'Projects', route: 'projects', relX: 0.38, relY: 0.38 },
          ],
        }}
      />,
    );
    expect(screen.getByText('NAVIGATIONS')).toBeDefined();
    const link = screen.getByText('Projects');
    link.click();
    expect(useRouteStore.getState().activeRoute).toBe('projects');
  });
});
