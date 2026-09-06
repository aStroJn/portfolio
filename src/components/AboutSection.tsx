export function AboutSection(): JSX.Element {
  return (
    <section
      id="about"
      style={{
        minHeight: 'auto',
        background: '#0a0a0f',
        color: '#fff',
        padding: 'clamp(2.5rem, 5vw, 3.5rem) clamp(1rem, 3.5vw, 2rem) clamp(2.5rem, 5vw, 4rem)',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >
        {/* Section Header: Standalone "ABOUT ME" */}
        <div>
          <img
            src="/assets/site/section-four/section-four-title.svg"
            alt="ABOUT ME"
            style={{
              width: 'clamp(180px, 45vw, 260px)',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>

        {/* Polaroid and Papernote Container (Snug together, responsive on all devices) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(1rem, 2.5vw, 2.5rem)',
            flexWrap: 'wrap',
          }}
        >
          {/* Left: Polaroid Frame */}
          <div
            style={{
              transform: 'rotate(-3deg)',
              transition: 'transform 0.3s ease',
              flexShrink: 0,
            }}
          >
            <img
              src="/assets/site/section-four/section-four-polaroid.png"
              alt="Polaroid illustration"
              style={{
                width: 'clamp(190px, 32vw, 300px)',
                height: 'auto',
                filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.7))',
                display: 'block',
              }}
            />
          </div>

          {/* Right: papernote.png + Overlaid Sticky Note & Mountain Doodle */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '660px',
              flex: '1 1 300px',
              boxSizing: 'border-box',
            }}
          >
            {/* The Paper Note Graphic Asset (section-four-papernote.png) */}
            <img
              src="/assets/site/section-four/section-four-papernote.png"
              alt="About me note - Full-stack engineer and Designer"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'drop-shadow(0 16px 36px rgba(0, 0, 0, 0.6))',
              }}
            />

            {/* Overlaid Yellow Sticky Note pinned to the top-right corner with zero text overlap */}
            <div
              style={{
                position: 'absolute',
                top: '-15px',
                right: 'clamp(-15px, -2vw, -30px)',
                width: 'clamp(75px, 14vw, 135px)',
                transform: 'rotate(5deg)',
                zIndex: 12,
                pointerEvents: 'none',
              }}
            >
              <img
                src="/assets/site/section-four/section-four-stickynote.png"
                alt="Sticky note - BUILD PLAY LEARN IMPROVE ☺"
                style={{
                  width: '100%',
                  height: 'auto',
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
                  display: 'block',
                }}
              />
            </div>

            {/* Mountain Peaks Doodle + "Some curiosity as always." (below sticky note at bottom-right corner) */}
            <div
              style={{
                position: 'absolute',
                bottom: 'clamp(5px, 2vw, 25px)',
                right: 'clamp(-10px, -1.5vw, -25px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            >
              {/* Pink Line Mountain Doodle */}
              <svg
                width="clamp(50px, 9vw, 80px)"
                height="clamp(32px, 5.5vw, 50px)"
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
                  fontSize: 'clamp(0.8rem, 1.2vw, 1.15rem)',
                  color: '#f472b6',
                  lineHeight: 1.15,
                  marginTop: '2px',
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
    </section>
  );
}
