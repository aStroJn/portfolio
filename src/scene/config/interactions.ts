import type { RouteId } from '../../state/route';
import type { SceneObjectId } from './scene';

export interface SignboardItem {
  label: string;
  route?: Exclude<RouteId, null>;
  isHeader?: boolean;
  /** Position within the signboard's bounding box, in [0, 1] of width/height. */
  relX: number;
  relY: number;
}

export type SignboardLink = SignboardItem;

export interface SignboardConfig {
  id: Extract<SceneObjectId, 'signLeft' | 'signRight'>;
  items: readonly SignboardItem[];
}

export interface ScreenConfig {
  id: Extract<SceneObjectId, 'screenLeft' | 'screenRight'>;
  contentByRoute: Readonly<Partial<Record<Exclude<RouteId, null>, string>>>;
  defaultContent: string;
}

export interface InteractionConfig {
  signboards: readonly SignboardConfig[];
  screens: readonly ScreenConfig[];
}

export const interactionConfig: InteractionConfig = {
  signboards: [
    {
      id: 'signRight',
      items: [
        { label: 'NAVIGATIONS', relX: 0.34, relY: 0.27, isHeader: true },
        { label: 'Projects', route: 'projects', relX: 0.32, relY: 0.38 },
        { label: 'About', route: 'about', relX: 0.38, relY: 0.47 },
        { label: 'Contact', route: 'contact', relX: 0.34, relY: 0.55 },
      ],
    },
  ],
  screens: [],
};
