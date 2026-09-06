import { create } from 'zustand';

export type RouteId = 'home' | 'projects' | 'about' | 'contact' | null;

interface RouteState {
  activeRoute: RouteId;
  setActiveRoute: (route: RouteId) => void;
}

export const useRouteStore = create<RouteState>((set) => ({
  activeRoute: null,
  setActiveRoute: (route) => set({ activeRoute: route }),
}));