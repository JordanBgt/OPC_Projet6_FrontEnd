import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public tokenStorageService: TokenStorageService,
              public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;
    if (!this.tokenStorageService.getToken()) {
      this.router.navigate(['login'], {queryParams: {url}});
      return false;
    }
    return true;
  }
}
