import { describe, it, expect } from 'vitest';
import { interactionConfig } from './interactions';

describe('interactionConfig', () => {
  it('every signboard item has a relX and relY in [0, 1]', () => {
    for (const sb of interactionConfig.signboards) {
      for (const item of sb.items) {
        expect(item.relX).toBeGreaterThanOrEqual(0);
        expect(item.relX).toBeLessThanOrEqual(1);
        expect(item.relY).toBeGreaterThanOrEqual(0);
        expect(item.relY).toBeLessThanOrEqual(1);
      }
    }
  });
});
