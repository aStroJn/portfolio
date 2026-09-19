import { Sprite } from 'pixi.js';
import { sceneData } from '../config/scene-data';

export interface ParallaxInput {
  x: number; // [-1, 1]
  y: number; // [-1, 1]
}

export const ZERO_PARALLAX: ParallaxInput = { x: 0, y: 0 };

export interface ParallaxConfig {
  amplitudeX: number;
  amplitudeY: number;
  scrollSideShift: number;
  scrollDownShift: number;
}

const DEFAULT_PARALLAX_CONFIG: ParallaxConfig = {
  amplitudeX: 18,
  amplitudeY: 10,
  scrollSideShift: 240,
  scrollDownShift: 180,
};

export class ParallaxSystem {
  private readonly tracked: Map<string, Sprite> = new Map();
  private readonly originals: Map<string, { x: number; y: number }> = new Map();

  constructor(
    private readonly config: ParallaxConfig = DEFAULT_PARALLAX_CONFIG,
  ) {}

  track(id: string, sprite: Sprite): void {
    this.tracked.set(id, sprite);
    this.originals.set(id, { x: sprite.x, y: sprite.y });
  }

  update(input: ParallaxInput, scrollProgress = 0): void {
    for (const [id, sprite] of this.tracked) {
      const obj = sceneData.objects.find((o) => o.id === id);
      if (!obj) continue;
      const orig = this.originals.get(id);
      if (!orig) continue;
      const depth = obj.depth ?? 0;

      // Mouse/Pointer parallax offset with safe clamping so layer boundaries are never exposed
      const rawMouseOffsetX = -input.x * depth * this.config.amplitudeX;
      const rawMouseOffsetY = -input.y * depth * this.config.amplitudeY;
      const mouseOffsetX = Math.max(-25, Math.min(25, rawMouseOffsetX));
      const mouseOffsetY = Math.max(-15, Math.min(15, rawMouseOffsetY));

      // Scroll-driven parting and transition offsets
      let scrollOffsetX = 0;
      let scrollOffsetY = 0;

      if (id === 'rightTree' || id === 'screenLeft') {
        // Left side elements slide towards left
        scrollOffsetX = -scrollProgress * this.config.scrollSideShift * (depth / 1.8);
      } else if (id === 'signRight' || id === 'screenRight' || id === 'rightLamp') {
        // Right side elements slide towards right
        scrollOffsetX = scrollProgress * this.config.scrollSideShift * (depth / 1.8);
      }

      if (id === 'bench' || id === 'ground' || id === 'midTrees' || id === 'screenLeft' || id === 'screenRight' || id === 'rightLamp' || id === 'signRight' || id === 'rightTree') {
        // Mid & foreground elements transition downwards into the lower section
        scrollOffsetY = scrollProgress * this.config.scrollDownShift * (depth / 1.8);
      }

      sprite.x = orig.x + mouseOffsetX + scrollOffsetX;
      sprite.y = orig.y + mouseOffsetY + scrollOffsetY;
    }
  }
}
