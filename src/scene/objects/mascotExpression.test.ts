import { describe, it, expect, vi } from 'vitest';

vi.mock('../../state/mascot', () => ({
  useMascotStore: { subscribe: vi.fn().mockReturnValue(() => {}) },
}));

import { bindMascotExpression } from './mascotExpression';
import type { Character } from './CharacterFactory';

describe('bindMascotExpression', () => {
  it('subscribes to the mascot store', () => {
    const ch = { play: vi.fn() } as unknown as Character;
    const unsub = bindMascotExpression(ch);
    expect(typeof unsub).toBe('function');
  });
});
