import { create } from 'zustand';

export interface SignboardPosition {
  x: number;
  y: number;
  scale: number;
}

interface SignboardState {
  position: SignboardPosition | null;
  setPosition: (pos: SignboardPosition) => void;
}

export const useSignboardStore = create<SignboardState>((set) => ({
  position: null,
  setPosition: (position) => set({ position }),
}));
