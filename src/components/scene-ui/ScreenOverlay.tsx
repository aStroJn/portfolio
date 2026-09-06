import type { ScreenConfig } from '../../scene/config/interactions';
import { sceneData } from '../../scene/config/scene-data';
import { useRouteStore } from '../../state/route';
import styles from './SignboardOverlay.module.css';

export interface ScreenOverlayProps {
  screen: ScreenConfig;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function ScreenOverlay({ screen, containerRef }: ScreenOverlayProps): JSX.Element | null {
  const activeRoute = useRouteStore((s) => s.activeRoute);
  const obj = sceneData.objects.find((o) => o.id === screen.id);
  if (!obj || !containerRef.current) return null;

  const parentRect = containerRef.current.getBoundingClientRect();
  const width = parentRect.width || (typeof window !== 'undefined' ? window.innerWidth : sceneData.masterWidth);
  const height = parentRect.height || (typeof window !== 'undefined' ? window.innerHeight : sceneData.masterHeight);

  const scaleX = width / sceneData.masterWidth;
  const scaleY = height / sceneData.masterHeight;
  const scale = Math.max(scaleX, scaleY);

  const scaledWidth = sceneData.masterWidth * scale;
  const scaledHeight = sceneData.masterHeight * scale;
  const offsetX = (width - scaledWidth) / 2;
  const offsetY = height - scaledHeight;

  const left = obj.x * scale + offsetX;
  const top = obj.y * scale + offsetY;
  const screenWidth = (obj.width ?? 262) * scale;
  const screenHeight = (obj.height ?? 216) * scale;

  const text = (activeRoute && screen.contentByRoute[activeRoute]) || screen.defaultContent;

  return (
    <div
      className={styles.overlay}
      style={{
        left,
        top,
        width: screenWidth,
        height: screenHeight,
        color: '#67e8f9',
        fontFamily: 'monospace',
        fontSize: `${Math.max(10, Math.min(14, 12 * scale))}px`,
        textShadow: '0 0 8px rgba(103, 232, 249, 0.6)',
      }}
      data-testid={`screen-${screen.id}`}
    >
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center', padding: '12px' }}>
        {text}
      </div>
    </div>
  );
}
