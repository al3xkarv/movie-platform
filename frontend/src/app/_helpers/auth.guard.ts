import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthenticationService } from '../_services';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // logged in so return true or if trying to navigate to login while logged in so back to dashboard
      // this.router.navigate(['/']); //, { queryParams: { returnUrl: state.url } });

      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']); //, //{ queryParams: { returnUrl: state.url } });
    return true;
  }
}
