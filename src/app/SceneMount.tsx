import { useEffect, useRef } from 'react';
import { SceneManager } from '../scene/core/SceneManager';

export function SceneMount(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const manager = new SceneManager();
    let isMounted = true;

    manager.mount(ref.current).then(() => {
      if (!isMounted) {
        manager.destroy();
      }
    }).catch((err) => {
      if (isMounted) {
        console.error('SceneManager mount failed', err);
      }
    });

    return () => {
      isMounted = false;
      manager.destroy();
    };
  }, []);

  return (
    <div
      ref={ref}
      data-testid="scene-mount"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#0a0a0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
}
