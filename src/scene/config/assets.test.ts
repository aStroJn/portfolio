import { describe, it, expect } from 'vitest';
import { allSceneAssetUrls } from './assets';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

describe('sceneAssets', () => {
  it('every asset path points to an existing file', () => {
    for (const assetPath of allSceneAssetUrls) {
      const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
      const onDisk = resolve(process.cwd(), 'public', cleanPath);
      expect(existsSync(onDisk)).toBe(true);
    }
  });
});
