import { describe, it, expect, beforeEach } from 'vitest';
import { useMascotStore } from './mascot';

describe('useMascotStore', () => {
  beforeEach(() => {
    useMascotStore.setState({ expression: 'neutral' });
  });

  it('starts at neutral', () => {
    expect(useMascotStore.getState().expression).toBe('neutral');
  });

  it('setExpression updates the expression', () => {
    useMascotStore.getState().setExpression('happy');
    expect(useMascotStore.getState().expression).toBe('happy');
  });
});
