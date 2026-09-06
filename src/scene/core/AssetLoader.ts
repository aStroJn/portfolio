import { Assets, type Texture } from 'pixi.js';
import { allSceneAssetUrls } from '../config/assets';

/**
 * Loads every unique asset URL into a Pixi texture cache.
 * Returns a Map<url, Texture> for direct lookup.
 */
export class AssetLoader {
  async load(): Promise<Map<string, Texture>> {
    const urls = Array.from(new Set(allSceneAssetUrls));
    const textures = new Map<string, Texture>();

    await Promise.all(
      urls.map(async (url) => {
        const texture = await Assets.load<Texture>(url);
        textures.set(url, texture);
      }),
    );

    return textures;
  }
}
