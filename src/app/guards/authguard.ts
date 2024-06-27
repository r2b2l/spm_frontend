import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const redirectTo = route.data['redirecTo'];

    if (!this.authService.isUserAuthenticated) {
      this.authService.authToken = null;
      this.router.navigateByUrl('/login?redirectAfterLogin=' + redirectTo);
      return false;
    }
    return true;
  }
}
