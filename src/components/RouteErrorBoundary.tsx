import { useRouteError } from 'react-router-dom';

export function RouteErrorBoundary(): JSX.Element {
  const error = useRouteError();
  console.error('Route error:', error);
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#fff', padding: '3rem', textAlign: 'center' }}>
      <h1 style={{ color: '#ef4444' }}>Something went wrong</h1>
      <p style={{ color: '#94a3b8' }}>{String(error)}</p>
      <a href="/" style={{ color: '#60a5fa', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block' }}>
        Return to Home
      </a>
    </div>
  );
}
