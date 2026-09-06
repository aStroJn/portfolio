import { interactionConfig } from '../../scene/config/interactions';
import { SignboardOverlay } from './SignboardOverlay';

export interface SceneOverlaysProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export function SceneOverlays({ containerRef }: SceneOverlaysProps): JSX.Element {
  return (
    <>
      {interactionConfig.signboards.map((sb) => (
        <SignboardOverlay key={sb.id} signboard={sb} containerRef={containerRef} />
      ))}
    </>
  );
}
