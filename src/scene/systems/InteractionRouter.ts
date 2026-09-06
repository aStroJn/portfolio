import { useRouteStore } from '../../state/route';
import type { SignboardItem } from '../config/interactions';

export class InteractionRouter {
  dispatch(item: SignboardItem): void {
    if (item.route) {
      useRouteStore.getState().setActiveRoute(item.route);
    }
  }
}
