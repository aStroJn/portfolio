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
      {/* Top Header Row: Big plant sticking to the left edge + Title to the right of it */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: 'clamp(0.5rem, 2.5vw, 2rem)',
          paddingRight: 'clamp(1rem, 3.5vw, 2.5rem)',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 3,
        }}
      >
        {/* Plant container: position relative, display flex, sticking to left side */}
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
              width: 'clamp(115px, 15vw, 240px)',
              height: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.6))',
            }}
          />
        </div>

        {/* Section Title placed cleanly on the right side of the plant */}
        <div
          style={{
            paddingTop: 'clamp(0.5rem, 1.5vw, 1.5rem)',
            flex: 1,
            maxWidth: '850px',
          }}
        >
          <img
            src="/assets/site/section-two/section-two-title.svg"
            alt="02. THE TOOLBOX - Languages, frameworks and tools I build with daily."
            style={{
              width: 'clamp(180px, 38vw, 420px)',
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Shelf pulled up snugly underneath the title */}
      <div
        style={{
          width: '100%',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginTop: 'clamp(-18rem, -22vw, -12rem)',
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
