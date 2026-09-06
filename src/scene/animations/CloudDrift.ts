import { gsap } from 'gsap';
import type { Container } from 'pixi.js';
import type { AnimationOrchestrator } from './AnimationOrchestrator';

export interface CloudDriftConfig {
  speedPxPerSec?: number;
  startX?: number;
  endX?: number;
}

export function createCloudDrift(
  orch: AnimationOrchestrator,
  clouds: Container[],
  config: CloudDriftConfig = {},
): gsap.core.Timeline {
  const masterTl = gsap.timeline();
  const startX = config.startX ?? 2100;
  const endX = config.endX ?? -950;
  const totalDistance = startX - endX;
  const baseSpeed = config.speedPxPerSec ?? 30; // pixels per second

  clouds.forEach((cloud, index) => {
    const cloudSpeed = baseSpeed * (0.85 + (index % 3) * 0.15);
    const fullDuration = totalDistance / cloudSpeed;

    const initialDistance = cloud.x - endX;
    const initialDuration = Math.max(0.5, initialDistance / cloudSpeed);

    const cloudTl = gsap.timeline();

    // Initial drift to left boundary
    cloudTl.to(cloud, {
      x: endX,
      duration: initialDuration,
      ease: 'none',
      onComplete: () => {
        cloud.x = startX;
        const loopTween = gsap.to(cloud, {
          x: endX,
          duration: fullDuration,
          ease: 'none',
          repeat: -1,
        });
        orch.register(loopTween as unknown as gsap.core.Timeline);
      },
    });

    masterTl.add(cloudTl, 0);
  });

  return orch.register(masterTl);
}
