import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRouteStore, type RouteId } from '../state/route';

const PATH_TO_ROUTE: Record<string, RouteId> = {
  '/': 'home',
  '/projects': 'projects',
  '/about': 'about',
  '/contact': 'contact',
};

const ROUTE_TO_PATH: Record<Exclude<RouteId, null>, string> = {
  home: '/',
  projects: '/projects',
  about: '/about',
  contact: '/contact',
};

export function RouteSync(): null {
  const location = useLocation();
  const navigate = useNavigate();

  // URL → store
  useEffect(() => {
    const id = PATH_TO_ROUTE[location.pathname] ?? null;
    useRouteStore.getState().setActiveRoute(id);
  }, [location.pathname]);

  // Store → URL
  useEffect(() => {
    const unsub = useRouteStore.subscribe((state) => {
      const path = state.activeRoute ? ROUTE_TO_PATH[state.activeRoute] : null;
      if (path && path !== location.pathname) {
        navigate(path);
      }
    });
    return unsub;
  }, [location.pathname, navigate]);

  return null;
}
