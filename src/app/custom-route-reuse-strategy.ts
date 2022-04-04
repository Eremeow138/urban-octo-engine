import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { ShipsListPageComponent } from './pages/ships-page/pages/ships-list-page/components/ships-list-page.component';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const routeKey = this.getKey(route);
    return routeKey === ShipsListPageComponent.toString();
  }

  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const routeKey = this.getKey(route);
    this.storedRoutes.set(routeKey, handle);
  }

  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const routeKey = this.getKey(route);
    return !!route.routeConfig && !!this.storedRoutes.get(routeKey);
  }

  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const routeKey = this.getKey(route);
    return this.storedRoutes.get(routeKey);
  }

  public shouldReuseRoute(
    futureRoute: ActivatedRouteSnapshot,
    currentRoute: ActivatedRouteSnapshot,
  ): boolean {
    return futureRoute.routeConfig === currentRoute.routeConfig;
  }

  private getKey(route: ActivatedRouteSnapshot): string {
    if (route.component) {
      return route.component.toString();
    }
    return route.firstChild.toString();
  }
}
