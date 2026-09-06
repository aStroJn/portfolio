import { Container, Sprite, type Texture } from 'pixi.js';
import { sceneData } from '../config/scene-data';

export class SceneRenderer {
  /**
   * Adds one Sprite per object in sceneData to `container`, sorted by
   * layerOrder. The container is mutated in place.
   * Returns a Map<id, Sprite> for systems like Parallax to track.
   */
  render(container: Container, textures: Map<string, Texture>): Map<string, Sprite> {
    const out = new Map<string, Sprite>();
    const sorted = [...sceneData.objects].sort((a, b) => a.layerOrder - b.layerOrder);

    for (const obj of sorted) {
      const texture = textures.get(obj.asset);
      if (!texture) {
        throw new Error(`Missing texture for ${obj.id}: ${obj.asset}`);
      }

      const sprite = new Sprite(texture);
      sprite.x = obj.x;
      sprite.y = obj.y;

      if (obj.width !== undefined) {
        sprite.width = obj.width;
      }
      if (obj.height !== undefined) {
        sprite.height = obj.height;
      }
      if (obj.anchor) {
        sprite.anchor.set(obj.anchor.x, obj.anchor.y);
      }

      container.addChild(sprite);
      out.set(obj.id, sprite);
    }

    return out;
  }
}
