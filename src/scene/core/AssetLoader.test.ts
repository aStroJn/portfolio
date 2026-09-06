import { describe, it, expect, vi } from 'vitest';

vi.mock('pixi.js', () => ({
  Assets: { load: vi.fn().mockResolvedValue({}) },
}));

import { AssetLoader } from './AssetLoader';
import { allSceneAssetUrls } from '../config/assets';

describe('AssetLoader', () => {
  it('loads every unique asset URL in allSceneAssetUrls', async () => {
    const loader = new AssetLoader();
    const textures = await loader.load();
    const unique = new Set(allSceneAssetUrls);
    expect(textures.size).toBe(unique.size);
  });
});
