type Technology = {
  name: string;
  icon: string;
  x: string;
  y: string;
  size: string;
};

const technologies: Technology[] = [
  {
    name: 'Python',
    icon: '/assets/site/section-two/tech/python.svg',
    x: '25.2%',
    y: '32%',
    size: 'clamp(55px, 5.5vw, 92px)',
  },
  {
    name: 'Django',
    icon: '/assets/site/section-two/tech/django.svg',
    x: '39.7%',
    y: '32%',
    size: 'clamp(48px, 5vw, 82px)',
  },
  {
    name: 'React',
    icon: '/assets/site/section-two/tech/react.svg',
    x: '54.9%',
    y: '32%',
    size: 'clamp(52px, 5.2vw, 86px)',
  },
  {
    name: 'TypeScript',
    icon: '/assets/site/section-two/tech/typescript.svg',
    x: '69.5%',
    y: '32%',
    size: 'clamp(48px, 5vw, 80px)',
  },
  {
    name: 'Git',
    icon: '/assets/site/section-two/tech/git.svg',
    x: '25.2%',
    y: '72%',
    size: 'clamp(48px, 5vw, 82px)',
  },
  {
    name: 'Docker',
    icon: '/assets/site/section-two/tech/docker.svg',
    x: '39.7%',
    y: '72%',
    size: 'clamp(48px, 5vw, 82px)',
  },
  {
    name: 'SQLite',
    icon: '/assets/site/section-two/tech/sqlite.svg',
    x: '54.9%',
    y: '72%',
    size: 'clamp(48px, 5vw, 82px)',
  },
  {
    name: 'JavaScript',
    icon: '/assets/site/section-two/tech/javascript.svg',
    x: '69.5%',
    y: '72%',
    size: 'clamp(48px, 5vw, 82px)',
  },
];

type TechIconProps = {
  src: string;
  alt: string;
  x: string;
  y: string;
  size?: string;
};

function TechIcon({ src, alt, x, y, size = 'clamp(48px, 5vw, 88px)' }: TechIconProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 3px 3px rgba(0,0,0,0.35))',
        transition: 'transform 180ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-50%, calc(-50% - 4px))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(-50%, -50%)';
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
}

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
            src="/assets/site/section-two/section-two-top-left-plant.webp"
            alt=""
            aria-hidden="true"
            style={{
              width: 'clamp(75px, 16vw, 200px)',
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
            src="/assets/site/section-two/section-two-title.webp"
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

      {/* Shelf Scene */}
      <div
        style={{
          width: '100%',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginTop: 'clamp(-11.5rem, -15vw, -5.5rem)',
          zIndex: 4,
          lineHeight: 0,
        }}
      >
        <img
          src="/assets/site/section-two/section-two-shelf.webp"
          alt="Toolbox shelf"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
          }}
        >
          {technologies.map((tech) => (
            <TechIcon
              key={tech.name}
              src={tech.icon}
              alt={tech.name}
              x={tech.x}
              y={tech.y}
              size={tech.size}
            />
          ))}
        </div>
      </div>
    </section>
  );
}