import type { SceneObjectId } from './scene';

/**
 * Single source of truth for scene asset paths.
 * Do not import assets from anywhere else in the codebase.
 */
export const sceneAssets = {
  sky: '/assets/scene/background/sky.webp',
  sun: '/assets/scene/background/sun.webp',
  mountains: '/assets/scene/background/mountains.webp',
  city: '/assets/scene/background/city.webp',
  midTrees: '/assets/scene/environment/mid-trees-bushes.webp',
  rightTree: '/assets/scene/environment/right-tree.webp',
  ground: '/assets/scene/foreground/ground.webp',
  bench: '/assets/scene/objects/bench.webp',
  screenLeft: '/assets/scene/objects/screen-left/screen-left-one.webp',
  screenRight: '/assets/scene/objects/screen right/screen-right-one.webp',
  signRight: '/assets/scene/objects/sign-right.webp',
  rightLamp: '/assets/scene/objects/right-lamp.webp',
  mascot: '/assets/scene/character/mascot.webp',
} as const;

export const screenLeftFrames = [
  '/assets/scene/objects/screen-left/screen-left-one.webp',
  '/assets/scene/objects/screen-left/screen-left-two.webp',
  '/assets/scene/objects/screen-left/screen-left-three.webp',
] as const;

export const screenRightFrames = [
  '/assets/scene/objects/screen right/screen-right-one.webp',
  '/assets/scene/objects/screen right/screen-right-two.webp',
  '/assets/scene/objects/screen right/screen-right-three.webp',
] as const;

export const allSceneAssetUrls = [
  ...Object.values(sceneAssets),
  ...screenLeftFrames,
  ...screenRightFrames,
] as const;

export type SceneAssetKey = keyof typeof sceneAssets;

/**
 * Map a stable scene-object ID to its asset path.
 * Returns null if the ID has no asset (e.g. placeholder multi-frame or deferred assets).
 */
export function findAssetPath(id: SceneObjectId): string | null {
  const map: Partial<Record<SceneObjectId, string>> = {
    sky: sceneAssets.sky,
    sun: sceneAssets.sun,
    mountains: sceneAssets.mountains,
    city: sceneAssets.city,
    midTrees: sceneAssets.midTrees,
    rightTree: sceneAssets.rightTree,
    ground: sceneAssets.ground,
    bench: sceneAssets.bench,
    screenLeft: sceneAssets.screenLeft,
    screenRight: sceneAssets.screenRight,
    signRight: sceneAssets.signRight,
    rightLamp: sceneAssets.rightLamp,
    mascot: sceneAssets.mascot,
  };
  return map[id] ?? null;
}