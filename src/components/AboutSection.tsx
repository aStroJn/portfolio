import { useEffect, useState } from 'react';

export function AboutSection(): JSX.Element {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const section = document.getElementById('about');
      if (!section) return;

      // Section horizontal padding: clamp(2.5rem, 5vw, 4rem) on each side
      // 2.5rem = 40px, 4rem = 64px
      const paddingPx = Math.min(Math.max(window.innerWidth * 0.05, 40), 64);
      const availableWidth = window.innerWidth - paddingPx * 2;

      const MASTER_WIDTH = 1080;
      const newScale = Math.min(1, availableWidth / MASTER_WIDTH);
      setScale(newScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <section
      id="about"
      style={{
        minHeight: 'auto',
        background: '#0a0a0f',
        color: '#fff',
        padding: '0 clamp(2.5rem, 5vw, 4rem) 0',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Independent decorative mascot hand */}
      <img
        src="/assets/site/section-four/section-four-Mascot-hand.webp"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '0',
          top: `${56 * scale}%`,
          width: scale > 0.999 ? 'clamp(300px, 22vw, 400px)' : 'clamp(180px, 15vw, 260px)',
          height: 'auto',
          transform: 'translate(-25%, -50%)',
          zIndex: 10,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* Responsive composition viewport */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {/* Master desktop canvas - fixed 1080px, scaled uniformly */}
        <div
          style={{
            width: '1080px',
            transformOrigin: 'top center',
            transform: `scale(${scale})`,
            // Scale also affects perceived height, so we need to account for it in parent layout
            // The parent div with justifyContent: 'center' handles horizontal centering
          }}
        >
          {/* Section Header: Standalone "ABOUT ME" */}
          <div style={{ textAlign: 'left', marginBottom: '24px' }}>
            <img
              src="/assets/site/section-four/section-four-title.webp"
              alt="ABOUT ME"
              style={{
                width: '260px', // desktop max from clamp(180px, 35vw, 260px)
                height: 'auto',
                display: 'inline-block',
              }}
            />
          </div>

          {/* Polaroid and Papernote Composition - Fixed desktop layout */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              gap: '40px', // Space between polaroid and papernote
            }}
          >
            {/* 3. Left: Polaroid Frame (Snug to the papernote) */}
            <div
              style={{
                transform: 'rotate(-3deg)',
                transition: 'transform 0.3s ease',
                flexShrink: 0,
              }}
            >
              <img
                src="/assets/site/section-four/section-four-polaroid.webp"
                alt="Polaroid illustration"
                style={{
                  width: '300px', // Fixed desktop width
                  height: 'auto',
                  filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.7))',
                  display: 'block',
                }}
              />
            </div>

            {/* Right: papernote.webp + Overlaid Sticky Note (Box 1) & Mountain Doodle (Box 2) */}
            <div
              style={{
                position: 'relative',
                width: '620px',
                minWidth: '620px',
                flexShrink: 0,
                boxSizing: 'border-box',
              }}
            >
              {/* The Paper Note Graphic Asset */}
              <img
                src="/assets/site/section-four/section-four-papernote.webp"
                alt="About me note - Full-stack engineer and Designer"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: 'drop-shadow(0 16px 36px rgba(0, 0, 0, 0.6))',
                  position: 'relative',
                  zIndex: 2,
                }}
              />

              {/* 1. Sticky Note - Placed in Red Box 1 on the right edge */}
              <div
                style={{
                  position: 'absolute',
                  top: '42px', // Fixed: was clamp(12px, 10%, 60px)
                  right: '-102px', // Fixed: was clamp(-103px, -18%, -125px)
                  width: '135px', // Fixed: was clamp(70px, 15vw, 135px)
                  transform: 'rotate(4deg)',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              >
                <img
                  src="/assets/site/section-four/section-four-stickynote.webp"
                  alt="Sticky note - BUILD PLAY LEARN IMPROVE ☺"
                  style={{
                    width: '100%',
                    height: 'auto',
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
                    display: 'block',
                  }}
                />
              </div>

              {/* 2. Mountain Doodle + Text - Scaled up & Placed in Red Box 2 on the bottom-right */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '30px', // Fixed: was clamp(30px, 4%, 30px)
                  right: '-105px', // Fixed: was clamp(-120px, -19%, -115px)
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  zIndex: 3,
                  pointerEvents: 'none',
                }}
              >
                {/* Scaled-up Pink Line Mountain Doodle */}
                <svg
                  width="105" // Fixed: was clamp(55px, 12vw, 105px)
                  height="68" // Fixed: was clamp(36px, 7.5vw, 68px)
                  viewBox="0 0 100 65"
                  fill="none"
                  style={{ display: 'block' }}
                  aria-hidden="true"
                >
                  {/* Left peak */}
                  <path
                    d="M 5 58 L 32 10 L 58 46"
                    stroke="#f472b6"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Left snow cap */}
                  <path
                    d="M 23 26 Q 32 30 40 25"
                    stroke="#f472b6"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  {/* Left hatch lines */}
                  <path
                    d="M 32 10 L 32 25 M 26 34 L 23 44 M 35 34 L 33 46"
                    stroke="#f472b6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  {/* Right peak */}
                  <path
                    d="M 45 42 L 68 22 L 95 58"
                    stroke="#f472b6"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Right snow cap */}
                  <path
                    d="M 58 35 Q 68 38 78 34"
                    stroke="#f472b6"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  {/* Right hatch lines */}
                  <path
                    d="M 68 22 L 68 34 M 73 42 L 77 48"
                    stroke="#f472b6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  {/* Ground line */}
                  <path
                    d="M 2 58 H 98"
                    stroke="#f472b6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Handwritten text */}
                <div
                  style={{
                    fontFamily: "'Caveat', 'Comic Sans MS', cursive",
                    fontSize: '1.28rem', // Fixed: was clamp(0.85rem, 1.4vw, 1.28rem)
                    color: '#f472b6',
                    lineHeight: 1.15,
                    marginTop: '3px',
                    textAlign: 'center',
                    transform: 'rotate(2deg)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Some curiosity
                  <br />
                  as always.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}