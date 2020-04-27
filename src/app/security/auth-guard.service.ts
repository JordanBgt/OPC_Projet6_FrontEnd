import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public tokenStorageService: TokenStorageService,
              public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.tokenStorageService.getToken()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
