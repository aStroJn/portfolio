import { useRef } from 'react';
import { SceneMount } from './SceneMount';
import { SceneOverlays } from '../components/scene-ui/SceneOverlays';
import { RouteSync } from './RouteSync';
import { ProjectsSection } from '../components/ProjectsSection';
import { ToolboxSection } from '../components/ToolboxSection';
// import { ExperimentsSection } from '../components/ExperimentsSection';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function App(): JSX.Element {
  const sceneContainerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden', background: '#0a0a0f', color: '#fff' }}>
      <RouteSync />

      {reducedMotion && (
        <div
          role="status"
          style={{
            position: 'fixed',
            top: '1.5rem',
            right: '1.5rem',
            zIndex: 60,
            padding: '6px 12px',
            background: 'rgba(234, 179, 8, 0.2)',
            color: '#fde047',
            border: '1px solid rgba(234, 179, 8, 0.4)',
            borderRadius: '8px',
            fontSize: '12px',
            backdropFilter: 'blur(8px)',
          }}
        >
          Reduced motion mode enabled
        </div>
      )}

      {/* Screen-reader descriptive summary */}
      <p
        id="scene-description"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
        }}
      >
        An interactive pixel-art scene with a vibrant sky, mountains, city skyline, trees, a bench,
        and interactive signboards. Use the wooden signboard to navigate projects, about, and contact sections.
      </p>

      {/* Hero Scene Section with PixiJS + HTML Overlays + Soft Vignette */}
      <section
        aria-describedby="scene-description"
        style={{
          position: 'relative',
          width: '100%',
          height: '100dvh',
          minHeight: '100vh',
          overflow: 'hidden',
          background: '#0a0a0f',
          touchAction: 'pan-y',
        }}
      >
        <div ref={sceneContainerRef} style={{ position: 'absolute', inset: 0 }}>
          <SceneMount />
        </div>
        <SceneOverlays containerRef={sceneContainerRef} />

        {/* Soft atmospheric vignette covering the outer edge without hiding the center scene */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(ellipse 90% 85% at 50% 50%, rgba(10, 10, 15, 0) 60%, rgba(10, 10, 15, 0.35) 85%, rgba(10, 10, 15, 0.8) 100%), linear-gradient(to bottom, transparent 80%, #0a0a0f 100%)',
          }}
        />
      </section>

      {/* Main Content Sections */}
      <ProjectsSection />
      <ToolboxSection />
      {/* <ExperimentsSection /> */}
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
