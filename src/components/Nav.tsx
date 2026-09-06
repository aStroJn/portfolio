import { Link } from 'react-router-dom';
import { useRouteStore } from '../state/route';

export function Nav(): JSX.Element {
  const activeRoute = useRouteStore((s) => s.activeRoute);

  const getLinkStyle = (id: string): React.CSSProperties => ({
    color: activeRoute === id ? '#60a5fa' : '#cbd5e1',
    fontWeight: activeRoute === id ? '700' : '500',
    textDecoration: 'none',
    fontSize: '0.9rem',
    padding: '6px 12px',
    borderRadius: '20px',
    background: activeRoute === id ? 'rgba(96, 165, 250, 0.15)' : 'transparent',
    border: activeRoute === id ? '1px solid rgba(96, 165, 250, 0.4)' : '1px solid transparent',
    transition: 'all 0.2s ease',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    whiteSpace: 'nowrap',
  });

  return (
    <header
      style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        maxWidth: 'calc(100% - 24px)',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '30px',
        padding: '4px 8px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      <nav style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', overflowX: 'auto' }}>
        <Link to="/" style={getLinkStyle('home')}>Home</Link>
        <Link to="/projects" style={getLinkStyle('projects')}>Projects</Link>
        <Link to="/about" style={getLinkStyle('about')}>About</Link>
        <Link to="/contact" style={getLinkStyle('contact')}>Contact</Link>
      </nav>
    </header>
  );
}
