import { useRef } from 'react';
import type { SignboardConfig, SignboardItem } from '../../scene/config/interactions';
import { sceneData } from '../../scene/config/scene-data';
import { useRouteStore } from '../../state/route';
import { useSignboardStore } from '../../state/signboard';
import styles from './SignboardOverlay.module.css';

export interface SignboardOverlayProps {
  signboard: SignboardConfig;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export function SignboardOverlay({ signboard }: SignboardOverlayProps): JSX.Element | null {
  const pos = useSignboardStore((s) => s.position);
  const dispatch = useRef<(item: SignboardItem) => void>(() => {});

  dispatch.current = (item) => {
    if (item.route) {
      useRouteStore.getState().setActiveRoute(item.route);
      const target = document.getElementById(item.route);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const obj = sceneData.objects.find((o) => o.id === signboard.id);
  if (!obj) return null;

  // Real-time synchronization from Pixi sprite global coordinates
  const scale = pos ? pos.scale : 1;
  const sbLeft = pos ? pos.x : 0;
  const sbTop = pos ? pos.y : 0;
  const sbWidth = (obj.width ?? 336) * scale;
  const sbHeight = (obj.height ?? 446) * scale;

  if (!pos) return null;

  return (
    <div
      className={styles.overlay}
      style={{
        left: `${sbLeft}px`,
        top: `${sbTop}px`,
        width: `${sbWidth}px`,
        height: `${sbHeight}px`,
      }}
      data-testid={`signboard-${signboard.id}`}
    >
      {signboard.items.map((item, i) =>
        item.isHeader ? (
          <span
            key={i}
            className={styles.header}
            style={{
              left: `${item.relX * 100}%`,
              top: `${item.relY * 100}%`,
              fontSize: `${Math.max(10, Math.min(14, 11 * scale))}px`,
            }}
          >
            {item.label}
          </span>
        ) : (
          <a
            key={i}
            className={styles.link}
            href={`#${item.route ?? ''}`}
            style={{
              left: `${item.relX * 100}%`,
              top: `${item.relY * 100}%`,
              fontSize: `${Math.max(12, Math.min(18, 14 * scale))}px`,
            }}
            onClick={(e) => {
              e.preventDefault();
              dispatch.current(item);
            }}
          >
            {item.label}
          </a>
        ),
      )}
    </div>
  );
}
