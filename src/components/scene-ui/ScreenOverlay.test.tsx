import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScreenOverlay } from './ScreenOverlay';
import { useRouteStore } from '../../state/route';

describe('ScreenOverlay', () => {
  it('shows default content when activeRoute is null', () => {
    useRouteStore.setState({ activeRoute: null });
    const div = document.createElement('div');
    document.body.appendChild(div);
    const ref = { current: div } as React.RefObject<HTMLDivElement>;
    render(
      <ScreenOverlay
        screen={{
          id: 'screenLeft',
          contentByRoute: { projects: 'Projects view' },
          defaultContent: 'Default',
        }}
        containerRef={ref}
      />,
    );
    expect(screen.getByTestId('screen-screenLeft').textContent).toContain('Default');
  });

  it('shows route-specific content when activeRoute matches', () => {
    useRouteStore.setState({ activeRoute: 'projects' });
    const div = document.createElement('div');
    document.body.appendChild(div);
    const ref = { current: div } as React.RefObject<HTMLDivElement>;
    render(
      <ScreenOverlay
        screen={{
          id: 'screenLeft',
          contentByRoute: { projects: 'Projects view' },
          defaultContent: 'Default',
        }}
        containerRef={ref}
      />,
    );
    expect(screen.getByTestId('screen-screenLeft').textContent).toContain('Projects view');
  });
});
