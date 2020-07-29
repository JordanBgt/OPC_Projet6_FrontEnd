import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

/**
 * AuthGuardService will be called when the user try to navigate to a protected route and will check if the user has
 * the right or not to access it
 */
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public tokenStorageService: TokenStorageService,
              public router: Router) {}

  /**
   * Method that returns a boolean indicating wether or not navigation to a route should be allowed. If there is no
   * token saved in the Session Storage, the user isn't authenticated and will be redirect to the login form
   * @param route contains information about the route {@see ActivatedRouteSnapshot}
   * @param state represents the state of the router {@see RouterStateSnapshot}. It contains the url of the route the
   * user wants to access before being intercept by the AuthGuard
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;
    if (!this.tokenStorageService.getToken()) {
      this.router.navigate(['login'], {queryParams: {url}});
      return false;
    }
    return true;
  }
}
