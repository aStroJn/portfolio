export function ToolboxSection(): JSX.Element {
  return (
    <section
      id="toolbox"
      style={{
        minHeight: 'auto',
        background: '#0A0A0F',
        color: '#fff',
        paddingTop: 0,
        paddingBottom: 0,
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Header Row: Plant sticking to left edge + Title on the right */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: 'clamp(0.5rem, 2vw, 1.75rem)',
          paddingRight: 'clamp(1rem, 3.5vw, 2.5rem)',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 3,
        }}
      >
        {/* Plant container: position relative, display flex, scaled nicely for mobile */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
            flexShrink: 0,
            margin: 0,
          }}
        >
          <img
            src="/assets/site/section-two/section-two-top-left-plant.png"
            alt=""
            aria-hidden="true"
            style={{
              width: 'clamp(75px, 14vw, 220px)',
              height: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.6))',
            }}
          />
        </div>

        {/* Section Title placed cleanly on the right side of the plant, sized slightly smaller */}
        <div
          style={{
            paddingTop: 'clamp(0.5rem, 1.2vw, 1.25rem)',
            flex: 1,
            maxWidth: '850px',
          }}
        >
          <img
            src="/assets/site/section-two/section-two-title.svg"
            alt="02. THE TOOLBOX - Languages, frameworks and tools I build with daily."
            style={{
              width: 'clamp(160px, 30vw, 360px)',
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Shelf lowered slightly (about 10-15px lower) to give clean breathing room under subtitle */}
      <div
        style={{
          width: '100%',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginTop: 'clamp(-16.5rem, -20vw, -10.5rem)',
          zIndex: 2,
          lineHeight: 0,
        }}
      >
        <img
          src="/assets/site/section-two/section-two-shelf.png"
          alt="Toolbox shelf"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'cover',
            filter: 'drop-shadow(0 -10px 25px rgba(0,0,0,0.4))',
          }}
        />
      </div>
    </section>
  );
}
