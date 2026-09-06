import { create } from 'zustand';

export type MascotExpression = 'neutral' | 'happy' | 'thinking';

interface MascotState {
  expression: MascotExpression;
  setExpression: (e: MascotExpression) => void;
}

export const useMascotStore = create<MascotState>((set) => ({
  expression: 'neutral',
  setExpression: (expression) => set({ expression }),
}));
