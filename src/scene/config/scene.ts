/**
 * SceneConfig is the bridge from Affinity artwork + exported assets
 * to the runtime scene. Populated from docs/scene-spec.md.
 */

export type SceneObjectId =
  | 'sky'
  | 'sun'
  | 'clouds'
  | 'birds'
  | 'mountains'
  | 'city'
  | 'midTrees'
  | 'rightTree'
  | 'bench'
  | 'signLeft'
  | 'signRight'
  | 'screenLeft'
  | 'screenRight'
  | 'ground'
  | 'human'
  | 'mascot'
  | 'shadow';

export interface SceneObjectConfig {
  id: SceneObjectId;
  asset: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  anchor?: { x: number; y: number };
  depth?: number;
  parallax?: number;
  layerOrder: number;
  interactive?: boolean;
}

export interface SceneConfig {
  masterWidth: number;
  masterHeight: number;
  objects: readonly SceneObjectConfig[];
}

export const defaultSceneConfig: SceneConfig = {
  masterWidth: 0,
  masterHeight: 0,
  objects: [],
};