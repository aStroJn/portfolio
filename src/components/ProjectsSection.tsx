import { ProjectCard } from './projects/ProjectCard';

export function ProjectsSection(): JSX.Element {
  return (
    <section
      id="projects"
      style={{
        minHeight: 'auto',
        background: '#0a0a0f',
        color: '#fff',
        padding: '10px clamp(1rem, 3.5vw, 2rem) 10px',
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
              src="/assets/site/section-one/section-one-title.svg"
              alt="01. FEATURED PROJECTS - Real-world projects, experiments and ideas brought to life."
              style={{
                width: 'clamp(180px, 60vw, 600px)',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>

          <div
            style={{
              fontFamily: "'Caveat', 'Comic Sans MS', cursive, sans-serif",
              color: '#64748b',
              fontSize: '0.9rem',
              textAlign: 'right',
              lineHeight: 1.3,
              letterSpacing: '0.05em',
            }}
          >
            SCROLL
            <br />
            FOR MORE
            <br />
            GOOD STUFF
            <br />
            ↓
          </div>
        </div>

        {/* 3 Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.75rem',
          }}
        >
          <ProjectCard
            title="MOSSO | E-Commerce Catalog"
            description="Headless e-commerce catalog powered by React and WordPress, featuring dynamic product management, collection-based browsing and GST-aware cart workflows"
            tags={['REACT', 'TYPESCRIPT', 'TAILWIND', 'WORDPRESS']}
            link="https://mosso-zeta.vercel.app"
            preview={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #181829 0%, #0d0e17 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                
                <div
                  style={{
                    width: '93%',
                    height: '85%',
                    background: 'rgba(10, 11, 20, 0.85)',
                    borderRadius: '5px',
                    border: '1px solid rgba(236, 72, 153, 0.3)',
                    padding: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 0 20px rgba(236, 72, 153, 0.15)',
                  }}
                >
                  <img src="./assets/demo/mosso.png" alt="MOSSO" style={{ width: '100%', height: '100%' }} />
                </div>
                
              </div>
            }
          />

          {/* Card 2: Devfolio Studio */}
          <ProjectCard
            title="Voice2Code"
            description="Local voice-to-code assistant that turns natural language into code with real-time speech recognition, AI generation, and automated code insertion."
            tags={['PYTHON', 'FLASK', 'ELECTROM', 'OLLAMA']}
            link="https://github.com"
            preview={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #091e3a 0%, #030a14 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Visual Placeholder: Canvas Wireframe */}
                <div
                  style={{
                    width: '93%',
                    height: '85%',
                    background: 'rgba(5, 15, 30, 0.9)',
                    borderRadius: '5px',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    padding: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 0 20px rgba(56, 189, 248, 0.15)',
                  }}
                >
                  <img src="./assets/demo/v2c.png" alt="Voice2Code" style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            }
          />

          {/* Card 3: Synthwave Hub */}
          <ProjectCard
            title="Synthwave Hub"
            description="WebAudio-driven interactive synthesizer and retro visualizer with MIDI support and real-time DSP filters."
            tags={['WEBAUDIO', 'CANVAS', 'TYPESCRIPT', 'TAILWIND']}
            link="https://github.com"
            preview={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #2e0854 0%, #120324 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Visual Placeholder: Audio Visualizer */}
                <div
                  style={{
                    width: '88%',
                    height: '80%',
                    background: 'rgba(20, 5, 40, 0.9)',
                    borderRadius: '8px',
                    border: '1px solid rgba(168, 85, 247, 0.4)',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '9px', color: '#c084fc', fontWeight: 700 }}>OSC 1 • SAWTOOTH</span>
                    <span style={{ fontSize: '8px', color: '#e879f9' }}>120 BPM</span>
                  </div>
                  {/* Waveform sine display */}
                  <svg width="100%" height="30" viewBox="0 0 160 30" style={{ overflow: 'visible' }}>
                    <path
                      d="M0 15 Q20 0 40 15 T80 15 T120 15 T160 15"
                      fill="none"
                      stroke="#c084fc"
                      strokeWidth="2"
                    />
                    <path
                      d="M0 15 Q20 30 40 15 T80 15 T120 15 T160 15"
                      fill="none"
                      stroke="#f472b6"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  </svg>
                  <div style={{ fontSize: '8px', color: '#a855f7', textAlign: 'center' }}>
                    Low-Pass Ladder Filter • Cutoff: 2.4kHz
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
