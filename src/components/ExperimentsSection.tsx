import { ExperimentCard } from './experiments/ExperimentCard';

export function ExperimentsSection(): JSX.Element {
  return (
    <section
      id="experiments"
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
      <div style={{ maxWidth: '1180px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <img
              src="/assets/site/section-three/section-three-title.svg"
              alt="03. EXPERIMENTS & PLAY"
              style={{
                width: 'clamp(240px, 75vw, 540px)',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>

          <div
            style={{
              fontFamily: "'Caveat', 'Comic Sans MS', cursive, sans-serif",
              color: '#818cf8',
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              letterSpacing: '0.04em',
            }}
          >
            <span>EXPLORE</span>
            <span>•</span>
            <span>PLAY</span>
            <span>•</span>
            <span>LEARN</span>
            <span>•</span>
            <span>REPEAT</span>
            <span>→</span>
          </div>
        </div>

        {/* 3 Experiment Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.75rem',
          }}
        >
          {/* 1. Multiplayer Cursor */}
          <ExperimentCard
            title="Multiplayer Cursor"
            description="Real-time cursor broadcasting with WebSockets and smooth lag-compensation interpolation."
            tag="SOCKET.IO"
            link="https://github.com"
            preview={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#070913',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Dot grid */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.15) 1px, transparent 0)',
                    backgroundSize: '14px 14px',
                  }}
                />

                {/* Multiple user cursor representations */}
                <div
                  style={{
                    position: 'absolute',
                    top: '30px',
                    left: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#a855f7">
                    <path d="M4 0l16 12-7 2-4 9z" />
                  </svg>
                  <span
                    style={{
                      background: '#a855f7',
                      color: '#fff',
                      fontSize: '8px',
                      fontWeight: 700,
                      padding: '1px 5px',
                      borderRadius: '6px',
                    }}
                  >
                    guest_882
                  </span>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: '90px',
                    left: '180px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#06b6d4">
                    <path d="M4 0l16 12-7 2-4 9z" />
                  </svg>
                  <span
                    style={{
                      background: '#06b6d4',
                      color: '#000',
                      fontSize: '8px',
                      fontWeight: 700,
                      padding: '1px 5px',
                      borderRadius: '6px',
                    }}
                  >
                    dev_akshat
                  </span>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: '120px',
                    left: '90px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                    <path d="M4 0l16 12-7 2-4 9z" />
                  </svg>
                  <span
                    style={{
                      background: '#f59e0b',
                      color: '#000',
                      fontSize: '8px',
                      fontWeight: 700,
                      padding: '1px 5px',
                      borderRadius: '6px',
                    }}
                  >
                    maya.eth
                  </span>
                </div>
              </div>
            }
          />

          {/* 2. Particle Playground */}
          <ExperimentCard
            title="Particle Playground"
            description="GPU-accelerated 2D particle simulation with interactive gravity attractors and fluid physics."
            tag="CANVAS / WEBGL"
            link="https://github.com"
            preview={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle at center, #1e1b4b 0%, #05050a 80%)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {/* Simulated swirling particles / constellation */}
                <svg width="220" height="140" viewBox="0 0 220 140" style={{ overflow: 'visible' }}>
                  {/* Constellation lines */}
                  <line x1="60" y1="40" x2="110" y2="70" stroke="rgba(129, 140, 248, 0.3)" strokeWidth="1" />
                  <line x1="110" y1="70" x2="160" y2="50" stroke="rgba(129, 140, 248, 0.3)" strokeWidth="1" />
                  <line x1="110" y1="70" x2="130" y2="110" stroke="rgba(129, 140, 248, 0.3)" strokeWidth="1" />
                  <line x1="110" y1="70" x2="80" y2="100" stroke="rgba(129, 140, 248, 0.3)" strokeWidth="1" />

                  {/* Center glowing attractor */}
                  <circle cx="110" cy="70" r="16" fill="rgba(168, 85, 247, 0.25)" />
                  <circle cx="110" cy="70" r="6" fill="#c084fc" />

                  {/* Satellite particles */}
                  <circle cx="60" cy="40" r="4" fill="#38bdf8" />
                  <circle cx="160" cy="50" r="5" fill="#f43f5e" />
                  <circle cx="130" cy="110" r="3.5" fill="#34d399" />
                  <circle cx="80" cy="100" r="4" fill="#facc15" />
                  <circle cx="170" cy="100" r="2.5" fill="#a855f7" />
                  <circle cx="45" cy="80" r="2.5" fill="#38bdf8" />
                </svg>
              </div>
            }
          />

          {/* 3. Chat Terminal */}
          <ExperimentCard
            title="Chat Terminal"
            description="Text-based retro BBS terminal chat with synth bleeps, customizable themes and ascii commands."
            tag="TERMINAL UI"
            link="https://github.com"
            preview={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#040706',
                  padding: '12px 14px',
                  boxSizing: 'border-box',
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  lineHeight: '1.6',
                  color: '#4ade80',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div>
                  <span style={{ color: '#64748b' }}>[12:04:19]</span> system initialized: v2.4.0
                </div>
                <div>
                  <span style={{ color: '#64748b' }}>[12:04:20]</span> connected to channel #general
                </div>
                <div>
                  <span style={{ color: '#a855f7' }}>guest_09:</span> hey everyone! cool portfolio!
                </div>
                <div>
                  <span style={{ color: '#38bdf8' }}>akshat:</span> thanks for stopping by!
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <span style={{ color: '#4ade80' }}>&gt;</span>
                  <span style={{ background: '#4ade80', width: '6px', height: '12px', display: 'inline-block' }} />
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
