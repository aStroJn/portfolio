import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OrientationPrompt } from './OrientationPrompt';

describe('OrientationPrompt', () => {
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  it('renders blank orientation notice when on mobile device in portrait mode', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('portrait') || query.includes('max-width: 1024px'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<OrientationPrompt />);

    const blocker = screen.getByTestId('orientation-blocker');
    expect(blocker).toBeDefined();
    expect(blocker.textContent).toContain('Please rotate the device and hold in landscape orientation');
    expect(blocker.textContent).toContain('Ensure screen auto-rotate is on');
  });

  it('does not render when in landscape orientation', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('landscape') && !query.includes('portrait'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(<OrientationPrompt />);
    expect(container.firstChild).toBeNull();
    expect(screen.queryByTestId('orientation-blocker')).toBeNull();
  });
});
