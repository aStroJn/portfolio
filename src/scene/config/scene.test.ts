import { describe, it, expect } from 'vitest';
import { sceneData } from './scene-data';
import { findAssetPath } from './assets';

describe('sceneData', () => {
  it('has a positive master width and height', () => {
    expect(sceneData.masterWidth).toBeGreaterThan(0);
    expect(sceneData.masterHeight).toBeGreaterThan(0);
  });

  it('every object has a unique ID', () => {
    const ids = sceneData.objects.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every object has a non-null asset path that resolves', () => {
    for (const obj of sceneData.objects) {
      expect(obj.asset).toBeTruthy();
      expect(findAssetPath(obj.id)).toBe(obj.asset);
    }
  });

  it('layer orders are unique and contiguous starting at 0', () => {
    const orders = sceneData.objects.map((o) => o.layerOrder).sort((a, b) => a - b);
    expect(orders[0]).toBe(0);
    orders.forEach((order, i) => expect(order).toBe(i));
  });
});
