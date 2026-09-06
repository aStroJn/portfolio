import { useEffect, useState, useCallback } from 'react';

export function OrientationPrompt(): JSX.Element | null {
  const [isPortraitMobile, setIsPortraitMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const isPortrait = window.matchMedia
      ? window.matchMedia('(orientation: portrait)').matches
      : window.innerHeight > window.innerWidth;
    const isMobile = window.matchMedia
      ? window.matchMedia('(max-width: 1024px)').matches
      : window.innerWidth <= 1024;
    return isPortrait && isMobile;
  });

  const checkOrientation = useCallback(() => {
    if (typeof window === 'undefined') return;
    const isPortrait = window.matchMedia
      ? window.matchMedia('(orientation: portrait)').matches
      : window.innerHeight > window.innerWidth;
    const isMobile = window.matchMedia
      ? window.matchMedia('(max-width: 1024px)').matches
      : window.innerWidth <= 1024;

    const portraitMobile = isPortrait && isMobile;
    setIsPortraitMobile(portraitMobile);

    if (portraitMobile) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      // Trigger resize for Pixi renderer when rotating into landscape
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    checkOrientation();

    const portraitQuery = window.matchMedia?.('(orientation: portrait) and (max-width: 1024px)');

    if (portraitQuery?.addEventListener) {
      portraitQuery.addEventListener('change', checkOrientation);
    }

    const screenOrientation = window.screen?.orientation;
    if (screenOrientation?.addEventListener) {
      screenOrientation.addEventListener('change', checkOrientation);
    }

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      if (portraitQuery?.removeEventListener) {
        portraitQuery.removeEventListener('change', checkOrientation);
      }
      if (screenOrientation?.removeEventListener) {
        screenOrientation.removeEventListener('change', checkOrientation);
      }
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [checkOrientation]);

  // Request motion permission on user tap (for iOS Safari gyro)
  const handleTap = async () => {
    const DeviceOrientation = (typeof DeviceOrientationEvent !== 'undefined'
      ? DeviceOrientationEvent
      : undefined) as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };
    if (DeviceOrientation && typeof DeviceOrientation.requestPermission === 'function') {
      try {
        await DeviceOrientation.requestPermission();
      } catch {
        // Ignored
      }
    }
  };

  // If in landscape or desktop, do not render
  if (!isPortraitMobile) {
    return null;
  }

  return (
    <div
      id="mobile-orientation-blocker"
      data-testid="orientation-blocker"
      role="alertdialog"
      aria-modal="true"
      aria-label="Orientation Notice"
      onClick={handleTap}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: 999999,
        background: '#0a0a0f',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        boxSizing: 'border-box',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Animated Phone Silhouette rotating from portrait to landscape */}
      <div
        className="phone-rotate-anim"
        style={{
          width: '54px',
          height: '84px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 0 16px rgba(56, 189, 248, 0.45))',
        }}
      >
        <svg
          width="54"
          height="84"
          viewBox="0 0 54 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Phone body */}
          <rect
            x="2"
            y="2"
            width="50"
            height="80"
            rx="10"
            fill="#0f172a"
            stroke="#38bdf8"
            strokeWidth="3"
          />
          {/* Screen area */}
          <rect
            x="6"
            y="10"
            width="42"
            height="62"
            rx="4"
            fill="#1e293b"
            stroke="rgba(56, 189, 248, 0.3)"
            strokeWidth="1"
          />
          {/* Landscape horizon bar inside screen */}
          <path
            d="M12 48L22 36L32 44L42 30"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
          {/* Speaker / Notch */}
          <rect x="21" y="5.5" width="12" height="2" rx="1" fill="#38bdf8" opacity="0.7" />
          {/* Home indicator */}
          <circle cx="27" cy="76" r="2.5" fill="#38bdf8" />
        </svg>
      </div>

      {/* Main Required Instruction */}
      <h2
        style={{
          fontFamily: "'Space Mono', monospace, -apple-system, sans-serif",
          fontSize: 'clamp(1.05rem, 4.8vw, 1.35rem)',
          fontWeight: 700,
          color: '#f8fafc',
          textAlign: 'center',
          margin: '0 0 12px 0',
          lineHeight: 1.45,
          maxWidth: '360px',
          letterSpacing: '-0.01em',
        }}
      >
        Please rotate the device and hold in landscape orientation
      </h2>

      {/* Experience Subtitle */}
      <p
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: 'clamp(0.85rem, 3.2vw, 0.95rem)',
          color: '#94a3b8',
          textAlign: 'center',
          margin: '0 0 20px 0',
          lineHeight: 1.5,
          maxWidth: '320px',
        }}
      >
        This portfolio is designed as an interactive widescreen landscape experience.
      </p>

      {/* Auto-rotate reminder tag */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '20px',
          background: 'rgba(56, 189, 248, 0.1)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          color: '#38bdf8',
          fontSize: '12px',
          fontWeight: 500,
          fontFamily: "'Space Mono', monospace, sans-serif",
        }}
      >
        <span>↻</span> Ensure screen auto-rotate is on
      </div>
    </div>
  );
}
