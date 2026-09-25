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
              src="/assets/site/section-one/section-one-title.webp"
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

        {/* 2 Project Cards Grid - Centered */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.75rem',
            maxWidth: '800px',
            margin: '0 auto',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
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
                    width: '85%',
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
                  <img src="./assets/demo/mosso.webp" alt="MOSSO" style={{ width: '100%', height: '100%' }} />
                </div>

              </div>
            }
          />

          {/* Card 2: Voice2Code */}
          <ProjectCard
            title="Voice2Code"
            description="Local voice-to-code assistant that turns natural language into code with real-time speech recognition, AI generation, and automated code insertion."
            tags={['PYTHON', 'FLASK', 'ELECTRON', 'OLLAMA']}
            link="https://v2c-astropia.vercel.app/"
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
                    width: '90%',
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
                  <img src="./assets/demo/v2c.webp" alt="Voice2Code" style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
