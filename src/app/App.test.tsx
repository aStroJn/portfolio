import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';

vi.mock('../scene/core/SceneManager', () => ({
  SceneManager: class {
    mount = vi.fn().mockResolvedValue(undefined);
    destroy = vi.fn();
  },
}));

describe('App', () => {
  it('renders the scene mount node', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('scene-mount')).toBeDefined();
  });

  it('shows a reduced-motion banner when prefers-reduced-motion is on', () => {
    vi.stubGlobal('matchMedia', () => ({
      matches: true,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('status')).toBeDefined();
    vi.unstubAllGlobals();
  });
});
