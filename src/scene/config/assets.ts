import type { SceneObjectId } from './scene';

/**
 * Single source of truth for scene asset paths.
 * Do not import assets from anywhere else in the codebase.
 */
export const sceneAssets = {
  sky: '/assets/scene/background/sky.png',
  sun: '/assets/scene/background/sun.png',
  mountains: '/assets/scene/background/mountains.png',
  city: '/assets/scene/background/city.png',
  midTrees: '/assets/scene/environment/mid-trees-bushes.png',
  rightTree: '/assets/scene/environment/right-tree.png',
  ground: '/assets/scene/foreground/ground.png',
  bench: '/assets/scene/objects/bench.png',
  screenLeft: '/assets/scene/objects/screen-left/screen-left-one.png',
  screenRight: '/assets/scene/objects/screen right/screen-right-one.png',
  signRight: '/assets/scene/objects/sign-right.png',
} as const;

export const screenLeftFrames = [
  '/assets/scene/objects/screen-left/screen-left-one.png',
  '/assets/scene/objects/screen-left/screen-left-two.png',
  '/assets/scene/objects/screen-left/screen-left-three.png',
] as const;

export const screenRightFrames = [
  '/assets/scene/objects/screen right/screen-right-one.png',
  '/assets/scene/objects/screen right/screen-right-two.png',
  '/assets/scene/objects/screen right/screen-right-three.png',
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
  };
  return map[id] ?? null;
}