import { create } from 'zustand';

export type SectionId = 'home' | 'projects' | 'about' | 'contact' | null;

export interface CameraScrollState {
  x: number;
  y: number;
  zoom: number;
}

interface ScrollState {
  cameraState: CameraScrollState;
  activeSection: SectionId;
  scrollProgress: number;
  setCameraState: (s: CameraScrollState) => void;
  setActiveSection: (id: SectionId) => void;
  setScrollProgress: (p: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  cameraState: { x: 0, y: 0, zoom: 1 },
  activeSection: 'home',
  scrollProgress: 0,
  setCameraState: (cameraState) => set({ cameraState }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
}));
